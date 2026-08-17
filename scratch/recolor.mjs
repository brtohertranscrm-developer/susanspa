import fs from 'fs';
import zlib from 'zlib';

function processPNG(inputPath, outputPath, targetRGB) {
  const buf = fs.readFileSync(inputPath);
  
  // Find IHDR chunk
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const bitDepth = buf[24];
  const colorType = buf[25]; // 6 = RGBA, 2 = RGB
  
  console.log(`Width: ${width}, Height: ${height}, Bit depth: ${bitDepth}, Color type: ${colorType}`);

  // Collect all IDAT chunks
  let pos = 8;
  const idatChunks = [];
  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') {
      idatChunks.push(buf.slice(pos + 8, pos + 8 + length));
    }
    pos += 12 + length;
  }

  const compressedData = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressedData);
  
  const bpp = colorType === 6 ? 4 : 3;
  const stride = 1 + width * bpp;
  const newRaw = Buffer.alloc(decompressed.length);

  // Un-filter scanlines (Filter 0: None, Filter 1: Sub, Filter 2: Up, Filter 3: Average, Filter 4: Paeth)
  const uncompressedRows = [];
  let prevRow = Buffer.alloc(width * bpp);

  for (let y = 0; y < height; y++) {
    const rowStart = y * stride;
    const filterType = decompressed[rowStart];
    const rawRow = Buffer.alloc(width * bpp);
    
    for (let x = 0; x < width * bpp; x++) {
      const rawByte = decompressed[rowStart + 1 + x];
      let a = x >= bpp ? rawRow[x - bpp] : 0;
      let b = prevRow[x];
      let c = x >= bpp ? prevRow[x - bpp] : 0;

      let recon = 0;
      if (filterType === 0) recon = rawByte;
      else if (filterType === 1) recon = (rawByte + a) & 0xff;
      else if (filterType === 2) recon = (rawByte + b) & 0xff;
      else if (filterType === 3) recon = (rawByte + Math.floor((a + b) / 2)) & 0xff;
      else if (filterType === 4) {
        let p = a + b - c;
        let pa = Math.abs(p - a);
        let pb = Math.abs(p - b);
        let pc = Math.abs(p - c);
        let pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        recon = (rawByte + pr) & 0xff;
      }
      rawRow[x] = recon;
    }
    prevRow = rawRow;
    uncompressedRows.push(rawRow);
  }

  // Now create output RGBA buffer (Filter type 0 for simplicity)
  const outDecompressed = Buffer.alloc(height * (1 + width * 4));
  let outPos = 0;

  for (let y = 0; y < height; y++) {
    outDecompressed[outPos++] = 0; // Filter 0 (None)
    const row = uncompressedRows[y];

    for (let x = 0; x < width; x++) {
      let r, g, b, a;
      if (bpp === 4) {
        r = row[x * 4];
        g = row[x * 4 + 1];
        b = row[x * 4 + 2];
        a = row[x * 4 + 3];
      } else {
        r = row[x * 3];
        g = row[x * 3 + 1];
        b = row[x * 3 + 2];
        a = 255;
      }

      // Calculate brightness (0 = dark text, 255 = light background)
      const brightness = (r + g + b) / 3;

      if (brightness < 200 && a > 30) {
        // Dark logo pixels -> Recolor to target RGB and retain opacity
        const opacity = (255 - brightness) / 255 * (a / 255);
        outDecompressed[outPos++] = targetRGB[0];
        outDecompressed[outPos++] = targetRGB[1];
        outDecompressed[outPos++] = targetRGB[2];
        outDecompressed[outPos++] = Math.round(opacity * 255);
      } else {
        // Light background -> Make transparent
        outDecompressed[outPos++] = 0;
        outDecompressed[outPos++] = 0;
        outDecompressed[outPos++] = 0;
        outDecompressed[outPos++] = 0;
      }
    }
  }

  // Compress output IDAT
  const newIDATData = zlib.deflateSync(outDecompressed);

  // Helper chunk writer
  function createChunk(typeStr, dataBuf) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(dataBuf.length, 0);
    const typeBuf = Buffer.from(typeStr, 'ascii');
    const typeAndData = Buffer.concat([typeBuf, dataBuf]);
    const crc = crc32(typeAndData);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeAndData, crcBuf]);
  }

  // Standard PNG Header
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR (Width, Height, BitDepth=8, ColorType=6(RGBA), Comp=0, Filter=0, Interlace=0)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', newIDATData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  fs.writeFileSync(outputPath, Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]));
  console.log(`Saved recolored PNG to ${outputPath}`);
}

// Simple CRC32 implementation
function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    for (let j = 0; j < 8; j++) {
      let bit = (byte ^ crc) & 1;
      crc = (crc >>> 1) ^ (bit ? 0xedb88320 : 0);
      byte >>>= 1;
    }
  }
  return (crc ^ -1) >>> 0;
}

// Generate Gold (#B59A63 -> RGB: 181, 154, 99)
processPNG('public/images/susan-spa-logo.png', 'public/images/susan-spa-logo-gold.png', [181, 154, 99]);

// Generate White (#FFFFFF -> RGB: 255, 255, 255)
processPNG('public/images/susan-spa-logo.png', 'public/images/susan-spa-logo-white.png', [255, 255, 255]);

// Generate Dark Forest (#10241F -> RGB: 16, 36, 31)
processPNG('public/images/susan-spa-logo.png', 'public/images/susan-spa-logo-dark.png', [16, 36, 31]);
