import React from "react";
import { useGetBlogPagesQuery } from "../blog/blogHooks";
import { Spinner } from "../Spinner";

export const NavbarBlog = () => {
  const getBlogQuery = useGetBlogPagesQuery();
  if (getBlogQuery.isLoading) return <Spinner />;
  if (!getBlogQuery.data) return <>No files from request...</>;

  return (
    <ul className=" space-y-2 ">
      {getBlogQuery.data.map((b) => (
        <li key={b.name} className="w-full">
          <button
            className="
              w-full
              flex 
              items-center
              p-2
              text-base 
              font-normal 
              text-gray-900 
              rounded-lg 
              transition 
              duration-75 
              hover:bg-gray-100 
              dark:hover:bg-gray-700 
              dark:text-gray-300
              group
            "
          >
            <span className="ml-4">{b.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
