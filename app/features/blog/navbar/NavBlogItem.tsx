import Link from "next/link";
import React, { FC } from "react";
import { fileNameToBlogName } from "../blogNamesUtils";

export const NavBlogItem: FC<{ fileName: string }> = ({ fileName }) => {
  const blog = fileNameToBlogName(fileName)
  const classes = `
      w-full flex items-center
      p-2
      rounded-lg 
      text-base font-normal text-gray-300
      transition-all duration-75 hover:bg-dark
    `;
  return (
    <Link href={`/blog/${fileName}`} className={classes} shallow={true}>
      {blog}
    </Link>
  );
};
