import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import EmotionProvider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dividend Logbook",
  description: "ETF 정보를 관리하고 배당 및 매도 수익을 추적하는 애플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <EmotionProvider>{children}</EmotionProvider>
      </body>
    </html>
  );
}
