import { FilesByDirectory } from "../types.js";

const generateFilesByDirectory = (files: string[]): FilesByDirectory => {
  const filesByDirectory: FilesByDirectory = [];

  for (const file of files) {
    const parts = file.split('/').filter(part => part !== '');
    let currentDirectory = '';
    let currentFiles: string[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentDirectory += `${i > 0 ? '/' : ''}${part}`;

      if (i === parts.length - 1) {
        // If it's a file
        currentFiles.push(part!); // Todo might be wrong
        filesByDirectory.push({ directory: currentDirectory, files: [...currentFiles] });
      } else {
        // If it's a directory
        const existingDirectory = filesByDirectory.find(dir => dir.directory === currentDirectory);
        if (existingDirectory) {
          currentFiles = existingDirectory.files;
        } else {
          currentFiles = [];
        }
      }
    }
  }

  return filesByDirectory;
}

export default generateFilesByDirectory;
