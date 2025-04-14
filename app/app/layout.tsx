import type { Metadata } from "next";
import "./globals.css";
import BlogNavbar from "@/features/blog/navbar/BlogNavbar";

export const metadata: Metadata = {
  title: "Alex the Guru",
  // description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
        text-primary transition-all bg-background
        flex flex-row
      "
      >
        <BlogNavbar />
        {children}
      </body>
    </html>
  );
}
