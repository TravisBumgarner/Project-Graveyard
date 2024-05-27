import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { Cache, CacheRunType } from './types.js';

const FILENAME = 'cache.json';
const DIRECTORY = '.backup-sync';

export const cacheData = async (data: Cache) => {
  const cacheDir = path.join(os.homedir(), DIRECTORY);
  await fs.mkdir(cacheDir, { recursive: true });
  const cacheFile = path.join(cacheDir, FILENAME);
  await fs.writeFile(cacheFile, JSON.stringify(data));
}

const EMPTY_CACHE: Cache = {
  activeRootDirectory: null,
  backupRootDirectory: null,
}

export const readCache = async (): Promise<Cache> => {
  const cacheFile = path.join(os.homedir(), DIRECTORY, FILENAME);
  try {
    const data = await fs.readFile(cacheFile, 'utf-8');
    const parsedData = JSON.parse(data);

    try {
      return CacheRunType.check(parsedData)
    } catch (err) {
      return structuredClone(EMPTY_CACHE);
    }

  } catch (err) {
    return structuredClone(EMPTY_CACHE);
  }
}



