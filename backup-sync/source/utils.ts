import os from 'os'
import path from 'path'
import fs from 'fs/promises'
import { State, StateRunType } from './types.js';
import _ from "lodash";

const FILENAME = 'state.json';
const DIRECTORY = '.backup-sync';

export const cacheData = async (data: State) => {
  const cacheDir = path.join(os.homedir(), DIRECTORY);
  await fs.mkdir(cacheDir, { recursive: true });
  const cacheFile = path.join(cacheDir, FILENAME);
  await fs.writeFile(cacheFile, JSON.stringify(data));
}

const EMPTY_STATE: State = {
  activeDirectory: null,
  backupDirectory: null,
}

export const readCache = async (): Promise<State> => {
  const cacheFile = path.join(os.homedir(), DIRECTORY, FILENAME);
  try {
    const data = await fs.readFile(cacheFile, 'utf-8');
    const parsedData = JSON.parse(data);

    try {
      return StateRunType.check(parsedData)
    } catch (err) {
      return structuredClone(EMPTY_STATE);
    }

  } catch (err) {
    return structuredClone(EMPTY_STATE);
  }
}



