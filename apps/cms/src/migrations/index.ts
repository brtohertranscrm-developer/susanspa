import * as migration_20260817_171021_initial_schema from './20260817_171021_initial_schema';
import * as migration_20261004_120000_add_media_imagekit_file_id from './20261004_120000_add_media_imagekit_file_id';
import * as migration_20261013_064947_add_site_settings_contact_fields from './20261013_064947_add_site_settings_contact_fields';
import * as migration_20261017_055540_add_page_heroes_global from './20261017_055540_add_page_heroes_global';
import * as migration_20261022_014327_editable_site_content from './20261022_014327_editable_site_content';
import * as migration_20261022_030614_custom_pages_and_page_visibility from './20261022_030614_custom_pages_and_page_visibility';

export const migrations = [
  {
    up: migration_20260817_171021_initial_schema.up,
    down: migration_20260817_171021_initial_schema.down,
    name: '20260817_171021_initial_schema',
  },
  {
    up: migration_20261004_120000_add_media_imagekit_file_id.up,
    down: migration_20261004_120000_add_media_imagekit_file_id.down,
    name: '20261004_120000_add_media_imagekit_file_id',
  },
  {
    up: migration_20261013_064947_add_site_settings_contact_fields.up,
    down: migration_20261013_064947_add_site_settings_contact_fields.down,
    name: '20261013_064947_add_site_settings_contact_fields',
  },
  {
    up: migration_20261017_055540_add_page_heroes_global.up,
    down: migration_20261017_055540_add_page_heroes_global.down,
    name: '20261017_055540_add_page_heroes_global',
  },
  {
    up: migration_20261022_014327_editable_site_content.up,
    down: migration_20261022_014327_editable_site_content.down,
    name: '20261022_014327_editable_site_content',
  },
  {
    up: migration_20261022_030614_custom_pages_and_page_visibility.up,
    down: migration_20261022_030614_custom_pages_and_page_visibility.down,
    name: '20261022_030614_custom_pages_and_page_visibility'
  },
];
