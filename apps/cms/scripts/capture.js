import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ARTIFACT_DIR = '/Users/apple/.gemini/antigravity-ide/brain/35e49709-9148-4d32-8136-bd2d14509954';

async function getAuthToken() {
  const res = await fetch('http://localhost:3001/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@susansparesort.com',
      password: 'Password123!',
    }),
  });
  const data = await res.json();
  return data.token;
}

async function captureScreen(desktopPage, mobilePage, url, desktopFilename, mobileFilename) {
  console.log(`Navigating to ${url}...`);

  // Desktop
  if (desktopFilename) {
    await desktopPage.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    const desktopPath = path.join(ARTIFACT_DIR, desktopFilename);
    await desktopPage.screenshot({ path: desktopPath });
    console.log(`Saved ${desktopFilename}`);
  }

  // Mobile
  if (mobileFilename) {
    await mobilePage.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    const mobilePath = path.join(ARTIFACT_DIR, mobileFilename);
    await mobilePage.screenshot({ path: mobilePath });
    console.log(`Saved ${mobileFilename}`);
  }
}

async function main() {
  const token = await getAuthToken();
  console.log('Got auth token successfully.');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1280, height: 800 });
  await desktopPage.setCookie({
    name: 'payload-token',
    value: token,
    domain: 'localhost',
    path: '/',
    httpOnly: true,
  });

  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844 });
  await mobilePage.setCookie({
    name: 'payload-token',
    value: token,
    domain: 'localhost',
    path: '/',
    httpOnly: true,
  });

  // 1. Dashboard (Desktop & Mobile)
  await captureScreen(
    desktopPage,
    mobilePage,
    'http://localhost:3001/cms',
    'dashboard_desktop.png',
    'dashboard_mobile.png'
  );

  // 2. Content List (Rooms - Desktop & Mobile)
  await captureScreen(
    desktopPage,
    mobilePage,
    'http://localhost:3001/cms/collections/rooms',
    'content_list_desktop.png',
    'content_list_mobile.png'
  );

  // 3. Editor (Edit Room - Desktop & Mobile)
  const roomsRes = await fetch('http://localhost:3001/api/rooms?limit=1', {
    headers: { Authorization: `JWT ${token}` },
  });
  const roomsData = await roomsRes.json();
  const firstRoomId = roomsData.docs?.[0]?.id || 11;

  await captureScreen(
    desktopPage,
    mobilePage,
    `http://localhost:3001/cms/collections/rooms/${firstRoomId}`,
    'editor_desktop.png',
    'editor_mobile.png'
  );

  // 4. Media Library
  await captureScreen(
    desktopPage,
    mobilePage,
    'http://localhost:3001/cms/collections/media',
    'media_library_desktop.png',
    'media_library_mobile.png'
  );

  await browser.close();
  console.log('All QA screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
