import { walkDirectoryRecursivelyAndHash } from "./utilities";

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