import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import EmotionProvider from "./providers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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
        <EmotionProvider>
          <Header />
          <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>
          <Footer />
        </EmotionProvider>
      </body>
    </html>
  );
}
