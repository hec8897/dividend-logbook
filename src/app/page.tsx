import { Header } from "@/components/common";
import { EtfListWithBoundary } from "@/domains/etf";

/**
 * 홈 페이지 (클라이언트 컴포넌트)
 *
 * EtfListWithBoundary는 자체적으로 ErrorBoundary + Suspense를 포함하므로
 * 간단하게 사용할 수 있습니다.
 */
export default function Home() {
  return (
    <div>
      <Header />
      <h1>Dividend Logbook</h1>
      <p>ETF 정보를 관리하고 배당 및 매도 수익을 추적하는 애플리케이션</p>

      {/* 컴포넌트 내부에서 로딩/에러 처리 */}
      <EtfListWithBoundary />
    </div>
  );
}
