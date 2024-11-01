import "server-only";
import fs from "fs/promises";

export const filesystemService = {
  readFile: async (path: string): Promise<string> => {
    const contents = await fs.readFile(path, "utf8");
    return contents;
  },
  listFilesInDirectory: async (path: string): Promise<string[]> => {
    try {
      const files = await fs.readdir(path);
      return files;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.log(`Error reading ${path}: Directory not found.`);
      } else {
        console.error(error);
      }
      return [];
    }
  },
};
