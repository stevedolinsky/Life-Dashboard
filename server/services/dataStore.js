import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data');

// Ensure DATA_DIR exists on module load
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error('Failed to create data directory:', error);
    }
  }
}

// Initialize data directory
ensureDataDir();

const dataStore = {
  async write(widgetType, data) {
    const filePath = path.join(DATA_DIR, `${widgetType}.json`);
    const dataWithTimestamp = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    await fs.writeFile(filePath, JSON.stringify(dataWithTimestamp, null, 2), 'utf-8');
  },

  async read(widgetType) {
    const filePath = path.join(DATA_DIR, `${widgetType}.json`);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }
};

export default dataStore;
