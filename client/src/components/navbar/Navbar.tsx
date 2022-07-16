import { NavbarBlog } from "./NavbarBlog";

export const Navbar = () => {
  return (
    <aside className=" min-h-screen " aria-label="Sidebar">
      <div
        className="
          overflow-y-auto 
          py-4 
          px-3 
          ml-4 
          my-4 
          sm:bg-gray-50 
          rounded-lg 
          sm:dark:bg-bg-500 
          sm:outline
          sm:outline-bg-400 
          sm:outline-1 
          sm:shadow 
          sm:hover:shadow-xl 
          transition 
          duration-300
        "
      >
        <NavbarBlog />
      </div>
    </aside>
  );
};
