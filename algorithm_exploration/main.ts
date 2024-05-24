import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as exifr from 'exifr'
import { ParsedData } from './types';


/** Take in a filename and date and generate a unique hash identifying a photo. 
 * Theoretically this should be sufficient information to identify a photo uniquely 
 * */
const generateUniqueHash = ({ filename, date }: { filename: string, date: string }): string => {
  const data: string = filename + date;
  const hashedData: string = crypto.createHash('sha256').update(data).digest('hex');

  return hashedData;
}

const walkDirectoryRecursivelyAndHash = async (dir: string, fileLookup: Record<string, string>): Promise<void> => {
  const files = fs.readdirSync(dir);
  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      await walkDirectoryRecursivelyAndHash(filePath, fileLookup);
    } else {
      const data = await exifr.parse(filePath) as ParsedData;
      console.log('Data:', data.DateTimeOriginal);
      const hash = generateUniqueHash({ filename, date: data.DateTimeOriginal });
      fileLookup[hash] = filePath; // Add to lookup
    }
  }
}




const main = async (backupLibraryRoot: string, activeLibraryRoot: string): Promise<void> => {
  const backupHashList: Record<string, string> = {};
  const activeHashList: Record<string, string> = {};

  await walkDirectoryRecursivelyAndHash(backupLibraryRoot, backupHashList);
  await walkDirectoryRecursivelyAndHash(activeLibraryRoot, activeHashList);

  console.log('Backup Hash List:', backupHashList);
  console.log('Active Hash List:', activeHashList);
  const missingFiles: Record<string, string> = {};

  // Find missing files
  for (const [hash, filename] of Object.entries(backupHashList)) {
    if (!activeHashList[hash]) {
      missingFiles[hash] = filename;
    }
  }

  console.log('Missing Files:', missingFiles);
}


const backupLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_backup';
const activeLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_active';

main(backupLibraryRoot, activeLibraryRoot)

export { }