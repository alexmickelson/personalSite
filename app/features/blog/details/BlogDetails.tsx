import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { theme } from "./theme";
import { getBlogContents } from "../blogFileService";
import ReactMarkdown, { Components } from "react-markdown";

export default async function BlogDetails({ fileName }: { fileName: string }) {
  const blog = await getBlogContents(fileName);
  return (
    <ReactMarkdown remarkPlugins={[gfm]} components={PrismMarkdownComponents}>
      {blog}
    </ReactMarkdown>
  );
}

const PrismMarkdownComponents: Components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: (props) => {
    const { children, className } = props;

    // const inline = props.className ? props.className.includes("inline") : false;
    // const match = /language-(\w+)/.exec(className || "");

    // if (match) console.log(children);
    if (!children) return <></>;

    const language = className?.replace("language-", "") ?? "";

    const inline = typeof children === "string" && !children.includes("\n");
    if (inline)
      return (
        <code className={` inline `} {...props}>
          {children}
        </code>
      );

    // const trimmedChildren = Array.isArray(children)
    //   ? children.map((c: string) => c.trim())
    //   : children.toString().trim();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { style: _style, children: _children, ...propsNoStyle } = props;

    // if (!inline)
    return (
      <SyntaxHighlighter
        style={theme}
        language={language}
        // PreTag="code"

        // showLineNumbers={true}
        wrapLines={true}
        useInlineStyles={true}
        // {...propsNoStyle}
      >
        {children.toString()}
      </SyntaxHighlighter>
    );
    // else
    //   return (
    //     <code className={className + " inline "} {...props}>
    //       {children}
    //     </code>
    //   );
  },
};
