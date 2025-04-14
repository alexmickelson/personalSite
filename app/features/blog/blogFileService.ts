"use server"
import { promises as fs } from "fs";
import path from "path";

export async function getBlogFileNamesFromServer() {
  const directoryPath = "/app/pages";
  try {
    const files = await fs.readdir(directoryPath);
    return files
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error);
    throw error;
  }
}

export async function getBlogContents(filename: string): Promise<string> {
  const sanitizedFileName = path.basename(filename); 
  const filePath = `/app/pages/${sanitizedFileName}`;
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}