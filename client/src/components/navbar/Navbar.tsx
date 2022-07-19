import { NavbarBlog } from "./NavbarBlog";

export const Navbar = () => {
  return (
    <aside
      aria-label="Sidebar"
      className="
          overflow-y-auto 
          py-4 
          px-3 
          ml-4 
          my-4 
          md:bg-gray-50 
          rounded-lg 
          md:dark:bg-bg-500 
          md:outline
          md:outline-bg-400 
          md:outline-1 
          md:shadow 
          md:hover:shadow-xl 
          transition 
          duration-300
        "
    >
      <NavbarBlog />
    </aside>
  );
};
