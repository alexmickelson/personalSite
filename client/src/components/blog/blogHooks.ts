import axios from "axios";
import { useQuery } from "react-query";
import { NginxFile } from "../../models/nginxFile";

export const blogHookKeys = {
  blogPages: () => ["blogPagesQueryKey"] as const,
  blog: (filename: string) => ["getBlogPageQueryKey", filename] as const,
};
export const useGetBlogPagesQuery = () =>
  useQuery(blogHookKeys.blogPages(), async () => {
    const url = "/pages/";

    const response = await axios.get<NginxFile[]>(url);
    const files = response.data.map((f) => ({
      ...f,
      mtime: new Date(f.mtime),
    }));
    const sorted = files.sort((a, b) => {
      const numA = parseInt(a.name.split("-")[0]);
      const numB = parseInt(b.name.split("-")[0]);
      if (numA === numB) return a.name.localeCompare(b.name);
      return numA - numB;
    });
    return sorted;
  });

export const useGetBlogQuery = (filename: string) =>
  useQuery(blogHookKeys.blog(filename), async () => {
    const url = `/pages/${filename}`
    const response = await axios.get<string>(url);
    return response.data;
  });
