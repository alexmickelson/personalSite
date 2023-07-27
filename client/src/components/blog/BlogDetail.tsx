import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Spinner } from "../Spinner";
import { useGetBlogQuery } from "./blogHooks";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { theme } from "./theme";

export const BlogDetail: FC<{ blogname: string }> = ({ blogname }) => {
  const blogQuery = useGetBlogQuery(blogname);
  if (blogQuery.isLoading) return <Spinner />;
  if (!blogQuery.data) return <>no blog data found</>;

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={
        PrismMarkdownComponents
      }
    >
      {blogQuery.data}
    </ReactMarkdown>
  );
};

const PrismMarkdownComponents = {
  code({ node, inline, children, className, ...props }: any) {
    const language = className?.replace("language-", "") ?? "";
    const match = /language-(\w+)/.exec(className || "");

    if (match) console.log(children);

    const trimmedChildren = children.map((c: string) => c.trim());

    if (!inline)
      return (
        <SyntaxHighlighter
          style={theme}
          language={language}
          PreTag="div"
          showLineNumbers={true}
          wrapLines={true }
          useInlineStyles={true}
          {...props}
        >
          {trimmedChildren}
        </SyntaxHighlighter>
      );
    else
      return (
        <code className={className + " inline "} {...props}>
          {children}
        </code>
      );
  },
};