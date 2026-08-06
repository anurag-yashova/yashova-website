import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CursorGlow from "@/components/CursorGlow";
import MetaPixel from "@/components/MetaPixel";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-hand",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yashova.com"),
  icons: { icon: "/icon-512.png", apple: "/apple-touch-icon.png" },
  title: {
    default: "Yashova — Performance Marketing Agency in Delhi NCR",
    template: "%s | Yashova",
  },
  description:
    "Most ad spend gets wasted on non-converting clicks. We build end-to-end marketing systems that track spend, qualify leads, and maximize ROI. Meta Ads, Google Ads, funnels and WhatsApp automation.",
  keywords: [
    "performance marketing agency",
    "performance marketing Faridabad",
    "performance marketing Delhi NCR",
    "Meta ads agency India",
    "Google Ads agency Delhi",
    "lead generation India",
    "WhatsApp automation",
    "funnel building agency",
  ],
  authors: [{ name: "Yashova" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yashova.com",
    siteName: "Yashova",
    title: "Yashova — Performance Marketing Agency in Delhi NCR",
    description:
      "No hype. Just revenue. Marketing systems that track spend, qualify leads, and maximize ROI.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Yashova — Not Loud. Unignorable." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashova — Performance Marketing Agency in Delhi NCR",
    description: "No hype. Just revenue.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} ${caveat.variable} h-full antialiased`}
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
        <MetaPixel />
      </body>
    </html>
  );
}
