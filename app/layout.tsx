import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Spend Audit",
  description:
    "Analyze and optimize your AI SaaS spending with personalized recommendations.",

  openGraph: {
    title: "AI Spend Audit",
    description:
      "Discover hidden savings across ChatGPT, Claude, Cursor, Copilot, and more.",

    url: "https://ai-spend-audit.vercel.app",

    siteName: "AI Spend Audit",

    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",

        width: 1200,
        height: 630,

        alt: "AI Spend Audit",
      },
    ],

    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}