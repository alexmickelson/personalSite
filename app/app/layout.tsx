import type { Metadata } from "next";
import "./globals.css";

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
      <body className="text-primary transition-all bg-background">{children}</body>
    </html>
  );
}
