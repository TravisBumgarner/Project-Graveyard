import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as os from 'os'

const brand = Symbol('brand')

type BHash = string & { [brand]: 'Hash' };
type BFilename = string & { [brand]: 'Filename' };
type BDate = string & { [brand]: 'Date' };

/** Take in a filename and date and generate a unique hash identifying a photo. 
 * Theoretically this should be sufficient information to identify a photo uniquely 
 * */
const generateUniqueHash = (filename: BFilename, date: BDate): string => {
  const data: string = filename + date;
  const hashedData: string = crypto.createHash('sha256').update(data).digest('hex');

  return hashedData;
}

const walkDirectoryRecursivelyAndHash = (dir: string, fileLookup: Record<string, string>): void => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walkDirectoryRecursivelyAndHash(filePath, fileLookup); // Recurse into subdirectories
    } else {
      console.log('hasing', file, stat.mtime.toISOString())
      const hash = generateUniqueHash(file as BFilename, stat.mtime.toISOString() as BDate);
      fileLookup[hash] = filePath; // Add to lookup
    }
  });
}




const main = (backupLibraryRoot: string, activeLibraryRoot: string): void => {
  const backupHashList: Record<BHash, BFilename> = {};
  const activeHashList: Record<BHash, BFilename> = {};

  walkDirectoryRecursivelyAndHash(backupLibraryRoot, backupHashList);
  walkDirectoryRecursivelyAndHash(activeLibraryRoot, activeHashList);

  const missingFiles: Record<BHash, BFilename> = {};

  // Find missing files
  for (const [hash, filename] of Object.entries(backupHashList)) {
    if (!activeHashList[hash]) {
      missingFiles[hash] = filename;
    }
  }

  console.log('Missing Files:', missingFiles);
}


const backupLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_input';
const activeLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_output';

main(backupLibraryRoot, activeLibraryRoot)


