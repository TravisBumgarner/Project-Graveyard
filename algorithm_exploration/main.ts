import { walkDirectoryRecursivelyAndHash } from "./utilities";

const DEBUG = false


const findMissingFiles = async (backupLibraryRoot: string, activeLibraryRoot: string): Promise<string[]> => {
  const backupHashList: Record<string, string> = {};
  const activeHashList: Record<string, string> = {};

  await walkDirectoryRecursivelyAndHash(backupLibraryRoot, backupHashList);
  await walkDirectoryRecursivelyAndHash(activeLibraryRoot, activeHashList);


  if (DEBUG) console.log('Backup Hash List:', backupHashList);
  if (DEBUG) console.log('Active Hash List:', activeHashList);
  const missingFiles: Record<string, string> = {};

  // Find missing files
  for (const [hash, filename] of Object.entries(backupHashList)) {
    if (!activeHashList[hash]) {
      missingFiles[hash] = filename;
    }
  }

  if (DEBUG) console.log('Missing Files:', missingFiles);

  return Object.values(missingFiles);
}




const main = async () => {
  const backupLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_backup';
  const activeLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_active';

  const missingFiles = await findMissingFiles(backupLibraryRoot, activeLibraryRoot)
  console.log(missingFiles)
}

main()

export { }