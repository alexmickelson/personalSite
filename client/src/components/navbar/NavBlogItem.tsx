import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { NginxFile } from "../../models/nginxFile";

export const NavBlogItem: FC<{ blog: NginxFile }> = ({ blog }) => {
  const betterName = blog.name
    .split("-")
    .splice(1)
    .join(" ")
    .split(".")
    .slice(-2, -1)
    .join(".");

  const formalName = betterName
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  return (
    <li key={blog.name} className="w-full">
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
          <NavLink
            to={`/blog/${blog.name}`}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 text-secondary border-secondary"
                : undefined
            }
          >
            {formalName}
          </NavLink>
        </span>
      </button>
    </li>
  );
};
