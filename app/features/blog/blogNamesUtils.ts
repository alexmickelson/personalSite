export function fileNameToBlogName(filename: string): string {
  const betterName = filename
    .split("-")
    .splice(1) // Remove the first segment
    .join(" ")
    .split(".")
    .slice(-2, -1) // Remove the file extension
    .join(".");

  const formalName = betterName
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) // Capitalize each word
    .join(" ");

  return formalName;
}