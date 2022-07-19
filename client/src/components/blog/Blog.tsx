import React from "react";
import { useParams } from "react-router-dom";
import { BlogDetail } from "./BlogDetail";

export const Blog = () => {
  const { blogname } = useParams();

  if (!blogname) return <div>blog not found</div>;
  return <BlogDetail blogname={blogname} />;
};
