import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Chen — Creative Developer & Digital Craftsman",
  description:
    "Portfolio of Alex Chen — a software engineer and creative developer building immersive digital experiences at the intersection of engineering and art.",
  keywords: [
    "creative developer",
    "software engineer",
    "portfolio",
    "frontend",
    "WebGL",
    "pixel art",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Alex Chen" }],
  creator: "Alex Chen",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Alex Chen — Creative Developer & Digital Craftsman",
    description:
      "Immersive digital experiences at the intersection of engineering and art.",
    siteName: "Alex Chen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen — Creative Developer",
    description:
      "Immersive digital experiences at the intersection of engineering and art.",
    creator: "@alexchen",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={pixelifySans.variable}>
      <body className="font-pixel antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
