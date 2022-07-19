import React from "react";
import { NavLink } from "react-router-dom";
import { useGetBlogPagesQuery } from "../blog/blogHooks";
import { Spinner } from "../Spinner";
import { NavBlogItem } from "./NavBlogItem";

export const NavbarBlog = () => {
  const getBlogQuery = useGetBlogPagesQuery();

  if (getBlogQuery.isLoading) return <Spinner />;
  if (!getBlogQuery.data) return <>No files from request...</>;

  return (
    <ul className=" space-y-2 ">
      {getBlogQuery.data.map((b) => (
        <NavBlogItem blog={b} />
      ))}
    </ul>
  );
};
