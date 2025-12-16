import { Suspense } from "react";
import { ErrorBoundary, Loading } from "@/components/common";
import { EtfList } from "./EtfList";

/**
 * ETF 목록 컴포넌트 (ErrorBoundary + Suspense 포함)
 *
 * 이 컴포넌트는 자체적으로 로딩/에러 처리를 포함하므로
 * 어디서든 간단하게 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * <EtfListWithBoundary />
 * ```
 */
export function EtfListWithBoundary() {
  return (
    <ErrorBoundary
      fallback={
        <div
          style={{
            padding: "20px",
            border: "2px solid #ff4444",
            borderRadius: "8px",
            backgroundColor: "#fff5f5",
          }}>
          <h3 style={{ color: "#d32f2f" }}>⚠️ ETF 목록을 불러올 수 없습니다</h3>
          <p style={{ color: "#666" }}>잠시 후 다시 시도해주세요.</p>
        </div>
      }>
      <Suspense fallback={<Loading />}>
        <EtfList />
      </Suspense>
    </ErrorBoundary>
  );
}
