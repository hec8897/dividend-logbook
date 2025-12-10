import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ETF 관리 | Dividend Logbook",
  description: "보유 ETF 정보를 관리합니다.",
};

export default function EtfLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "2rem" }}>
      {/* ETF 섹션 전용 헤더나 사이드바를 여기에 추가할 수 있습니다 */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          ETF 포트폴리오
        </h2>
        <p style={{ color: "#666", marginTop: "0.5rem" }}>
          보유하고 있는 ETF를 관리하고 수익을 추적하세요
        </p>
      </div>
      {children}
    </div>
  );
}
