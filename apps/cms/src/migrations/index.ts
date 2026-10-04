import * as migration_20260817_171021_initial_schema from './20260817_171021_initial_schema';
import * as migration_20261004_120000_add_media_imagekit_file_id from './20261004_120000_add_media_imagekit_file_id';

export const migrations = [
  {
    up: migration_20260817_171021_initial_schema.up,
    down: migration_20260817_171021_initial_schema.down,
    name: '20260817_171021_initial_schema',
  },
  {
    up: migration_20261004_120000_add_media_imagekit_file_id.up,
    down: migration_20261004_120000_add_media_imagekit_file_id.down,
    name: '20261004_120000_add_media_imagekit_file_id'
  },
];
