import React, { FC, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Spinner } from "../Spinner";
import { useGetBlogQuery } from "./blogHooks";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { theme } from "./theme";
import rangeParser from "parse-numeric-range";
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
      // rehypePlugins={[ rehypeHighlight]}
      remarkPlugins={[gfm]}
      components={
        // MarkdownComponents
        PrismMarkdownComponents
      }
    >
      {blogQuery.data}
    </ReactMarkdown>
  );
};

const PrismMarkdownComponents = {
  code({ node, inline, children, className, ...props }: any) {
    const language = className?.replace("language-", "");
    const match = /language-(\w+)/.exec(className || "");
    const hasMeta = node?.data?.meta;

    // if (!match)
    //   console.log({ node, inline, children, className, language, props });
    if (match) console.log(children);

    const trimmedChildren = children.map((c: string) => c.trim());

    if (!inline)
      return (
        <SyntaxHighlighter
          style={theme}
          language={language}
              PreTag="div"
          showLineNumbers={false}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          // lineProps={applyHighlights}
          {...props}
        >
          {trimmedChildren}
        </SyntaxHighlighter>
      );
    else
      return (
        <code className={className + " inline"} {...props}>
          {children}
        </code>
      );
  },
};

const PrismHighlighter: FC<{
  props: any;
  children: React.ReactNode & React.ReactNode[];
  language?: string;
}> = ({ language, props, children }) => (
  <SyntaxHighlighter
    style={theme}
    useInlineStyles={true}
    language={language}
    // showLineNumbers
    {...props}
  >
    {children}
  </SyntaxHighlighter>
);

// const MarkdownComponents = {
//   code({ node, inline, className, ...props }: any) {
//     const match = /language-(\w+)/.exec(className || "");
//     const hasMeta = node?.data?.meta;

//     const applyHighlights: object = (applyHighlights: number) => {
//       if (hasMeta) {
//         const RE = /{([\d,-]+)}/;
//         const metadata = node.data.meta?.replace(/\s/g, "");
//         const strlineNumbers = RE?.test(metadata)
//           ? RE?.exec(metadata)![1]
//           : "0";
//         const highlightLines = rangeParser(strlineNumbers);
//         const highlight = highlightLines;
//         const data: string | null = highlight.includes(applyHighlights)
//           ? "highlight"
//           : null;
//         return { data };
//       } else {
//         return {};
//       }
//     };

//     return match ? (
//       <SyntaxHighlighter
//         style={theme}
//         language={match[1]}
//         // PreTag="div"
//         // className="codeStyle"
//         // showLineNumbers={true}
//         // wrapLines={hasMeta ? true : false}
//         // useInlineStyles={true}
//         // lineProps={applyHighlights}
//         children={props.children}
//         {...props} />
//     ) : (
//       <code className={className} {...props} />
//     );
//   },
// };
