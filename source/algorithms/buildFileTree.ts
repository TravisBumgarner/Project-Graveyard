type FileTree = {
  [key: string]: FileTree | string[]
}

const generateFileTree = (files: string[]) => {
  // Copilot wrote this function. Don't @ me.
  const fileTree: FileTree = {};

  for (const file of files) {
    const parts = file.split('/').filter(part => part !== '');
    let current: FileTree | string[] = fileTree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i] as string; // Might be incorrect.
      if (i === parts.length - 1) {
        // If it's a file
        if (Array.isArray(current)) {
          current.push(file);
        } else {
          current[part] = [file];
        }
      } else {
        // If it's a directory
        if (!current[part]) {
          current[part] = i === parts.length - 2 ? [] : {};
        }
        current = current[part] as FileTree;
      }
    }
  }

  return fileTree;
}

export default generateFileTree