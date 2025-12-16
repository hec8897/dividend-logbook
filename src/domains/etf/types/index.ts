/**
 * ETF 기본 정보 (API에서 받아오는 데이터)
 */
export interface ETF {
  ticker: string; // 종목코드
  name: string; // 종목명
  currentPrice: number; // 현재가
  changeRate: number; // 등락률 (%)
  changePrice: number; // 전일대비
  tradingVolume: number; // 거래량
  marketCap: number; // 시가총액 (억원)
  dividendYield: number; // 분배금수익률 (%)
  category: string; // 카테고리
  listingDate: string; // 상장일
  managementFee: number; // 총보수 (%)
  manager: string; // 운용사
  currency: "KRW" | "USD";
}

/**
 * 포트폴리오 ETF (사용자가 보유한 ETF)
 * ETF 기본 정보 + 포트폴리오 정보
 */
export interface PortfolioETF extends ETF {
  id: string; // 포트폴리오 고유 ID
  quantity: number; // 보유 수량
  averagePrice: number; // 평균 매입가
  addedAt: string; // 포트폴리오 추가일
}

/**
 * API 응답 타입
 */
export interface ETFListResponse {
  success: boolean;
  data: ETF[];
  total: number;
  timestamp: string;
}

export interface ETFDetailResponse {
  success: boolean;
  data: ETF;
  timestamp: string;
}

export interface ETFCategoriesResponse {
  success: boolean;
  data: string[];
  total: number;
  timestamp: string;
}

/**
 * API 쿼리 파라미터
 */
export interface ETFQueryParams {
  category?: string;
  search?: string;
  sortBy?: "dividend" | "marketCap";
  limit?: number;
}

// 하위 호환성을 위한 별칭
export type Etf = ETF;
