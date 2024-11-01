"use server"
import { promises as fs } from "fs";

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
