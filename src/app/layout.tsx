import type { Metadata } from "next";
import "./globals.css";

export const generateMetadata = (): Metadata => {
  return {
    title: process.env.NEXT_PUBLIC_TITLE || "倒计时",
    description: "精美的网页倒计时应用，支持自定义目标日期和必应壁纸背景",
    keywords: "倒计时,countdown,日期,计时器",
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
