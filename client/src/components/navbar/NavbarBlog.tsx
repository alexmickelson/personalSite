import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetBlogPagesQuery } from "../blog/blogHooks";
import { Spinner } from "../Spinner";

export const NavbarBlog = () => {
  const getBlogQuery = useGetBlogPagesQuery();
  const navigate = useNavigate();

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
            <span className="ml-4">
              <Link to={`/blog/${b.name}`}>{b.name}</Link>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
