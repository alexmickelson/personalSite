import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { theme } from "./theme";
import { getBlogContents } from "../blogFileService";
import ReactMarkdown from "react-markdown";

export default async function BlogDetails({ fileName }: { fileName: string }) {
  const blog = await getBlogContents(fileName);
  return (
        <ReactMarkdown
          remarkPlugins={[gfm]}
          components={PrismMarkdownComponents}
        >
          {blog}
        </ReactMarkdown>
  );
}

// export const BlogDetail: FC<{ blogname: string }> = ({ blogname }) => {
//   const blogQuery = useGetBlogQuery(blogname);
//   if (blogQuery.isLoading) return <Spinner />;
//   if (!blogQuery.data) return <>no blog data found</>;

//   return (
//     <ReactMarkdown
//       remarkPlugins={[gfm]}
//       components={
//         PrismMarkdownComponents
//       }
//     >
//       {blogQuery.data}
//     </ReactMarkdown>
//   );
// };

const PrismMarkdownComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: ({ inline, children, className, ...props }: any) => {
    const language = className?.replace("language-", "") ?? "";
    // const match = /language-(\w+)/.exec(className || "");

    // if (match) console.log(children);

    const trimmedChildren = children.map
      ? children.map((c: string) => c.trim())
      : children.trim();

    if (!inline)
      return (
        <SyntaxHighlighter
          style={theme}
          language={language}
          // PreTag="code"
          
          showLineNumbers={true}
          wrapLines={true}
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
