import type { Metadata } from "next";
import { Noto_Sans_JP, DotGothic16 } from "next/font/google";
import { Providers } from "@/components/Providers";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${dotGothic.variable} antialiased`} style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
        <Providers>
          <div className="mx-auto max-w-[375px] min-h-screen relative bg-[#FFFEF2]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
