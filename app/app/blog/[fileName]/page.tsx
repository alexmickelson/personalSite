import BlogDetails from "@/features/blog/details/BlogDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ fileName: string }>;
}) {
  const { fileName } = await params;
  return (
    <div className=" w-full flex row justify-center">
      <div className="max-w-6xl ">
        <BlogDetails fileName={fileName} />
      </div>
    </div>
  );
}
