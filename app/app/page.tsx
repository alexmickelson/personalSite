import { getBlogFileNamesFromServer } from "@/features/blog/blogFileService";
import { fileNameToBlogName } from "@/features/blog/blogNamesUtils";

export default async function Home() {
  const filenames = await getBlogFileNamesFromServer();

  const blogNames = filenames.map(fileNameToBlogName)
  return (
    <div>
      {blogNames.map((b) => (
        <div key={b}>{b}</div>
      ))}
    </div>
  );
}
