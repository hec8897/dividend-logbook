"use client";
import { useSuspenseEtfListQuery } from "../hooks/useEtfListQuery";

/**
 * ETF 목록 컴포넌트 (Suspense 모드)
 * ErrorBoundary + Suspense와 함께 사용
 * - 로딩 상태: Suspense가 처리
 * - 에러 상태: ErrorBoundary가 처리
 */
export const EtfList = () => {
  // useSuspenseQuery는 isLoading, error를 반환하지 않음
  // 로딩 중이면 Suspense가 catch
  // 에러 발생 시 ErrorBoundary가 catch
  const { data: etfList } = useSuspenseEtfListQuery();

  return (
    <div style={{ padding: "20px" }}>
      <h2>ETF 목록 ({etfList?.length || 0}개)</h2>
      {etfList && etfList.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {etfList.slice(0, 10).map((etf) => (
            <li
              key={etf.ticker}
              style={{
                padding: "12px",
                marginBottom: "8px",
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}>
              <strong>{etf.name}</strong> ({etf.ticker})
              <br />
              <span style={{ color: "#666" }}>
                현재가: {etf.currentPrice.toLocaleString()}원
              </span>
              {" | "}
              <span style={{ color: "#1976d2" }}>
                배당수익률: {etf.dividendYield}%
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>ETF 데이터가 없습니다.</p>
      )}
    </div>
  );
};
