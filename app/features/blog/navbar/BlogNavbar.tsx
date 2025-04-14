import { getBlogFileNamesFromServer } from "../blogFileService";
import { NavBlogItem } from "./NavBlogItem";

export default async function BlogNavbar() {
  const filenames = await getBlogFileNamesFromServer();

  return (
    <aside
      aria-label="Sidebar"
      className="
          overflow-y-auto 
          rounded-lg
          md:py-4 md:px-3 md:ml-4 md:my-4
          md:bg-bg-500 md:outline md:outline-bg-400 md:outline-1 md:shadow 
          md:hover:shadow-xl 

          transition 
          duration-300
        "
    >
      <div className=" space-y-2 ">
        {filenames.map((f) => (
          <NavBlogItem fileName={f} key={f} />
        ))}
      </div>
    </aside>
  );
}
