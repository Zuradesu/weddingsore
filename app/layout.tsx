import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, DM_Sans } from "next/font/google";
import { wedding } from "@/data/wedding";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const arabic = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-arabic", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = { title: wedding.site.title, description: wedding.site.description };
export const viewport: Viewport = { themeColor: "#263B4B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
