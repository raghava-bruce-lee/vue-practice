import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const playwrightFolderPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'playwright');

export default async () => {
  try {
    await fs.access(playwrightFolderPath);
    await fs.rm(playwrightFolderPath, { recursive: true, force: true });
    console.log('playwright folder deleted successfully.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('playwright folder does not exist.');
    } else {
      console.error('Error deleting playwright folder: ', error);
    }
  }
};
