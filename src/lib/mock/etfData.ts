/**
 * 국내 ETF 목업 데이터
 * 한국투자증권 Open API 응답 형식을 참고하여 작성
 */

export interface MockETF {
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
  currency: "KRW";
}

/**
 * 인기 국내 ETF 목업 데이터
 * 실제 데이터를 참고하여 작성 (2025년 기준)
 */
export const mockETFList: MockETF[] = [
  // TIGER ETF
  {
    ticker: "360750",
    name: "TIGER 미국S&P500",
    currentPrice: 16850,
    changeRate: 1.52,
    changePrice: 252,
    tradingVolume: 1523847,
    marketCap: 98500,
    dividendYield: 1.24,
    category: "해외주식",
    listingDate: "2020-11-19",
    managementFee: 0.07,
    manager: "미래에셋자산운용",
    currency: "KRW",
  },
  {
    ticker: "133690",
    name: "TIGER 미국나스닥100",
    currentPrice: 28350,
    changeRate: 2.13,
    changePrice: 591,
    tradingVolume: 2456123,
    marketCap: 125300,
    dividendYield: 0.85,
    category: "해외주식",
    listingDate: "2010-07-20",
    managementFee: 0.07,
    manager: "미래에셋자산운용",
    currency: "KRW",
  },
  {
    ticker: "448290",
    name: "TIGER 미국배당다우존스",
    currentPrice: 12450,
    changeRate: 0.89,
    changePrice: 110,
    tradingVolume: 987654,
    marketCap: 45200,
    dividendYield: 3.42,
    category: "해외주식",
    listingDate: "2023-03-15",
    managementFee: 0.05,
    manager: "미래에셋자산운용",
    currency: "KRW",
  },

  // KODEX ETF
  {
    ticker: "251350",
    name: "KODEX 코스닥150레버리지",
    currentPrice: 8420,
    changeRate: -0.83,
    changePrice: -70,
    tradingVolume: 15234567,
    marketCap: 35600,
    dividendYield: 0,
    category: "국내주식(레버리지)",
    listingDate: "2009-10-26",
    managementFee: 0.54,
    manager: "삼성자산운용",
    currency: "KRW",
  },
  {
    ticker: "122630",
    name: "KODEX 레버리지",
    currentPrice: 15670,
    changeRate: -1.25,
    changePrice: -198,
    tradingVolume: 18945632,
    marketCap: 78900,
    dividendYield: 0,
    category: "국내주식(레버리지)",
    listingDate: "2009-05-04",
    managementFee: 0.64,
    manager: "삼성자산운용",
    currency: "KRW",
  },
  {
    ticker: "069500",
    name: "KODEX 200",
    currentPrice: 39850,
    changeRate: 0.45,
    changePrice: 178,
    tradingVolume: 3456789,
    marketCap: 185600,
    dividendYield: 1.89,
    category: "국내주식",
    listingDate: "2002-10-14",
    managementFee: 0.15,
    manager: "삼성자산운용",
    currency: "KRW",
  },

  // ARIRANG ETF
  {
    ticker: "315480",
    name: "ARIRANG 고배당주",
    currentPrice: 11250,
    changeRate: 1.08,
    changePrice: 120,
    tradingVolume: 654321,
    marketCap: 28900,
    dividendYield: 4.56,
    category: "국내주식(배당)",
    listingDate: "2018-12-13",
    managementFee: 0.3,
    manager: "한화자산운용",
    currency: "KRW",
  },

  // KBSTAR ETF
  {
    ticker: "148020",
    name: "KBSTAR 200",
    currentPrice: 39720,
    changeRate: 0.43,
    changePrice: 170,
    tradingVolume: 876543,
    marketCap: 45800,
    dividendYield: 1.92,
    category: "국내주식",
    listingDate: "2010-04-12",
    managementFee: 0.15,
    manager: "KB자산운용",
    currency: "KRW",
  },

  // ACE ETF
  {
    ticker: "461270",
    name: "ACE 미국배당다우존스",
    currentPrice: 13580,
    changeRate: 0.96,
    changePrice: 129,
    tradingVolume: 456789,
    marketCap: 32100,
    dividendYield: 3.28,
    category: "해외주식",
    listingDate: "2023-08-22",
    managementFee: 0.05,
    manager: "한국투자신탁운용",
    currency: "KRW",
  },
  {
    ticker: "458730",
    name: "ACE 미국S&P500",
    currentPrice: 16920,
    changeRate: 1.48,
    changePrice: 247,
    tradingVolume: 1234567,
    marketCap: 67800,
    dividendYield: 1.18,
    category: "해외주식",
    listingDate: "2023-06-29",
    managementFee: 0.07,
    manager: "한국투자신탁운용",
    currency: "KRW",
  },

  // SOL ETF
  {
    ticker: "371460",
    name: "SOL 미국배당다우존스",
    currentPrice: 13420,
    changeRate: 0.92,
    changePrice: 122,
    tradingVolume: 345678,
    marketCap: 28500,
    dividendYield: 3.35,
    category: "해외주식",
    listingDate: "2021-06-24",
    managementFee: 0.05,
    manager: "신한자산운용",
    currency: "KRW",
  },

  // 채권/배당 ETF
  {
    ticker: "325020",
    name: "KODEX 미국채울트라30년선물",
    currentPrice: 9850,
    changeRate: -0.35,
    changePrice: -35,
    tradingVolume: 234567,
    marketCap: 18900,
    dividendYield: 0,
    category: "해외채권",
    listingDate: "2019-05-29",
    managementFee: 0.05,
    manager: "삼성자산운용",
    currency: "KRW",
  },
  {
    ticker: "305720",
    name: "KODEX 미국채10년선물",
    currentPrice: 10250,
    changeRate: -0.15,
    changePrice: -15,
    tradingVolume: 567890,
    marketCap: 42300,
    dividendYield: 0,
    category: "해외채권",
    listingDate: "2018-03-23",
    managementFee: 0.05,
    manager: "삼성자산운용",
    currency: "KRW",
  },

  // 섹터 ETF
  {
    ticker: "143850",
    name: "TIGER 200IT",
    currentPrice: 45600,
    changeRate: 2.34,
    changePrice: 1043,
    tradingVolume: 123456,
    marketCap: 15600,
    dividendYield: 0.87,
    category: "국내주식(섹터)",
    listingDate: "2010-07-05",
    managementFee: 0.45,
    manager: "미래에셋자산운용",
    currency: "KRW",
  },
  {
    ticker: "267770",
    name: "TIGER 200건설",
    currentPrice: 22350,
    changeRate: -0.67,
    changePrice: -151,
    tradingVolume: 98765,
    marketCap: 8900,
    dividendYield: 2.45,
    category: "국내주식(섹터)",
    listingDate: "2016-05-11",
    managementFee: 0.45,
    manager: "미래에셋자산운용",
    currency: "KRW",
  },
];

/**
 * 티커로 ETF 정보 조회
 */
export const getETFByTicker = (ticker: string): MockETF | undefined => {
  return mockETFList.find((etf) => etf.ticker === ticker);
};

/**
 * 카테고리별 ETF 조회
 */
export const getETFsByCategory = (category: string): MockETF[] => {
  return mockETFList.filter((etf) => etf.category === category);
};

/**
 * 배당수익률 높은 순으로 정렬
 */
export const getETFsSortedByDividend = (): MockETF[] => {
  return [...mockETFList].sort((a, b) => b.dividendYield - a.dividendYield);
};

/**
 * 시가총액 높은 순으로 정렬
 */
export const getETFsSortedByMarketCap = (): MockETF[] => {
  return [...mockETFList].sort((a, b) => b.marketCap - a.marketCap);
};

/**
 * 모든 카테고리 목록 가져오기
 */
export const getCategories = (): string[] => {
  const categories = mockETFList.map((etf) => etf.category);
  return Array.from(new Set(categories));
};

/**
 * 운용사별 ETF 조회
 */
export const getETFsByManager = (manager: string): MockETF[] => {
  return mockETFList.filter((etf) => etf.manager === manager);
};

/**
 * 검색 (종목명 또는 티커)
 */
export const searchETFs = (keyword: string): MockETF[] => {
  const lowerKeyword = keyword.toLowerCase();
  return mockETFList.filter(
    (etf) =>
      etf.name.toLowerCase().includes(lowerKeyword) ||
      etf.ticker.includes(lowerKeyword)
  );
};
