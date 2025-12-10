"use client";

import { useEtfStore } from "@/domains/etf";
import "./page.css"; // 일반 CSS 파일 import

export default function EtfPage() {
  const { etfs } = useEtfStore();

  return (
    <main className="etf-container">
      <h1 className="etf-title">ETF 관리</h1>
      <div>
        {etfs.length === 0 ? (
          <p className="etf-empty-state">등록된 ETF가 없습니다.</p>
        ) : (
          <ul className="etf-list">
            {etfs.map((etf) => (
              <li key={etf.id} className="etf-item">
                <div>
                  <h2 className="etf-ticker">{etf.ticker}</h2>
                  <p className="etf-name">{etf.name}</p>
                  <div className="etf-info">
                    <span className="etf-info-item">
                      <span className="etf-info-label">보유 수량:</span>
                      {etf.quantity}주
                    </span>
                    <span className="etf-info-item">
                      <span className="etf-info-label">평균 매수가:</span>$
                      {etf.averagePrice}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
