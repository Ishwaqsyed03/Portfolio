import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import CommandPalette from "../components/CommandPalette";
import { SITE } from "../content/data";
import PurpleFlameBackground from "../components/PurpleFlameBackground";

// Using system fonts to avoid Google Fonts fetching issues in sandboxed environments
// These CSS variables are defined in globals.css
const fontVariables = "";

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
        <body className={`${fontVariables} antialiased bg-black text-white font-sans`}>
          <PurpleFlameBackground />
          <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-black text-white px-3 py-2 rounded">Skip to content</a>
          <Navbar />
          <CommandPalette />
          <div id="content">{children}</div>
        </body>
    </html>
  );
}
