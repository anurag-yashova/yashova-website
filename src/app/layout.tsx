import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yashova.com"),
  title: {
    default: "Yashova — No Hype. Just Revenue.",
    template: "%s | Yashova",
  },
  description:
    "Performance marketing systems for coaches, healthcare brands, D2C and education. Meta Ads, Google Ads, funnels and WhatsApp automation that turn ad spend into tracked revenue.",
  openGraph: {
    title: "Yashova — No Hype. Just Revenue.",
    description:
      "Performance marketing systems that track spend, qualify leads, and maximize ROI.",
    url: "https://yashova.com",
    siteName: "Yashova",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
