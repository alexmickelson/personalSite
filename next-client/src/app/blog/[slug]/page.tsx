import { filesystemService } from "@/services/filesystemService";
import ReactMarkdown from "react-markdown";
import React from "react";

export default async function page({ params }: { params: { slug: string } }) {
  // TODO: this is dangerous
  const contents = await filesystemService.readFile(
    `../pages/${params.slug}`
  );
  return (
    <div>
      page
      <div>{params.slug}</div>
      <ReactMarkdown>{contents}</ReactMarkdown>
    </div>
  );
}
