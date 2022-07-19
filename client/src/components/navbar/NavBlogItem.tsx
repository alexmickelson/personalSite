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

  const classes = `
      w-full
      flex 
      items-center
      p-2
      text-base 
      font-normal 
      text-gray-900 
      rounded-lg 
      transition-all
      duration-75 
      hover:bg-gray-100 
      dark:hover:bg-dark
      dark:text-gray-300
      group
    `;
  return (
    <NavLink
      to={`/blog/${blog.name}`}
      className={({ isActive }) =>
        isActive
          ? "border-2 text-secondary border-secondary" + classes
          : classes
      }
    >
      {formalName}
    </NavLink>
  );
};
