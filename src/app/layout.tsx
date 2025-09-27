import type { Metadata, Viewport } from "next";
// import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import CommandPalette from "../components/CommandPalette";
import { SITE } from "../content/data";
import PurpleFlameBackground from "../components/PurpleFlameBackground";

// Temporary fallback for fonts during development - will work with system fonts
const inter = { variable: "--font-sans" };
const mono = { variable: "--font-mono" };

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  icons: { icon: "/icons/icon-192.png" },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://www.ishwaqsyed.me"),
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    images: ["/nebula.jpg"],
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/nebula.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f23",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
        <body className={`${inter.variable} ${mono.variable} antialiased bg-black text-white`}>
          <PurpleFlameBackground />
          <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-black text-white px-3 py-2 rounded">Skip to content</a>
          <Navbar />
          <CommandPalette />
          <div id="content">{children}</div>
        </body>
    </html>
  );
}
