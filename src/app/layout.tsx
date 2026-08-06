import type { Metadata } from "next";
import { Montserrat, Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CursorGlow from "@/components/CursorGlow";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yashova.com"),
  title: {
    default: "Performance Marketing Agency | Meta & Google Ads Experts | Yashova",
    template: "%s | Yashova",
  },
  description:
    "Most ad spend gets wasted on non-converting clicks. We design end-to-end marketing systems that track spend, qualify leads, and maximize ROI.",
  openGraph: {
    title: "Home - Yashova",
    description:
      "Most ad spend gets wasted on non-converting clicks. We design end-to-end marketing systems that track spend, qualify leads, and maximize ROI.",
    url: "https://yashova.com",
    siteName: "Yashova",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${poppins.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("yashova-theme")==="light")document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CursorGlow />
      </body>
    </html>
  );
}
