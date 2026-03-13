import type { Metadata } from "next";
import { Noto_Sans_JP, DotGothic16 } from "next/font/google";
import { Providers } from "@/components/Providers";
import { NotificationScheduler } from "@/components/NotificationScheduler";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

const dotGothic = DotGothic16({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dot-gothic",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Toku Token",
  description: "tokuを積んで、花を咲かせよう",
  manifest: "/manifest.json",
  themeColor: "#3B1C1C",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Toku",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className={`${notoSansJP.variable} ${dotGothic.variable} antialiased`} style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
        <Providers>
          <div className="mx-auto max-w-[375px] min-h-screen relative bg-[#FFFEF2]">
            {children}
          </div>
          <NotificationScheduler />
        </Providers>
      </body>
    </html>
  );
}
