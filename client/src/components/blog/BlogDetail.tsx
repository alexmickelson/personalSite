import React, { FC, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Spinner } from "../Spinner";
import { useGetBlogQuery } from "./blogHooks";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { theme } from "./theme";

// import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
// import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
// import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
// import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
// import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
// import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

// SyntaxHighlighter.registerLanguage("tsx", tsx);
// SyntaxHighlighter.registerLanguage("typescript", typescript);
// SyntaxHighlighter.registerLanguage("scss", scss);
// SyntaxHighlighter.registerLanguage("bash", bash);
// SyntaxHighlighter.registerLanguage("markdown", markdown);
// SyntaxHighlighter.registerLanguage("json", json);

export const BlogDetail: FC<{ blogname: string }> = ({ blogname }) => {
  const blogQuery = useGetBlogQuery(blogname);
  if (blogQuery.isLoading) return <Spinner />;
  if (!blogQuery.data) return <>no blog data found</>;
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, gfm]}
      components={{
        code({ node, inline, children, className, ...props }) {
          const language = className?.replace("language-", "");
          console.log({ node, inline, children, className, language, props });
          return (
            <PrismHighlighter
              language={language}
              props={props}
              children={children}
            />
          );
        },
      }}
    >
      {blogQuery.data}
    </ReactMarkdown>
  );
};

const PrismHighlighter: FC<{
  props: any;
  children: React.ReactNode & React.ReactNode[];
  language?: string;
}> = ({ language, props, children }) => (
  <SyntaxHighlighter
    style={theme}
    language={language}
    // showLineNumbers
    {...props}
  >
    {children}
  </SyntaxHighlighter>
);
