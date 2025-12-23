import { apiClient } from "./axios";
import type {
  ETF,
  ETFListResponse,
  ETFDetailResponse,
  ETFCategoriesResponse,
  ETFQueryParams,
} from "@/domains/etf/types";
import { kisClient } from "./kis/client";

/**
 * ETF API 클라이언트
 */
export const etfApi = {
  /**
   * ETF 목록 조회
   *
   * @example
   * ```ts
   * const etfs = await etfApi.getList();
   * const filtered = await etfApi.getList({ category: '해외주식' });
   * const searched = await etfApi.getList({ search: '배당' });
   * ```
   */
  getList: async (params?: ETFQueryParams): Promise<ETF[]> => {
    const response = await kisClient.authenticatedGet<ETFListResponse>(
      "/api/kis/stock/005930",
      "FHKST01010100",
      { params }
    );
    return response.data.data;
  },

  /**
   * 개별 ETF 상세 조회
   *
   * @example
   * ```ts
   * const etf = await etfApi.getDetail('360750');
   * ```
   */
  getDetail: async (ticker: string): Promise<ETF> => {
    const response = await apiClient.get<ETFDetailResponse>(`/etf/${ticker}`);
    return response.data.data;
  },

  /**
   * ETF 카테고리 목록 조회
   *
   * @example
   * ```ts
   * const categories = await etfApi.getCategories();
   * ```
   */
  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<ETFCategoriesResponse>(
      "/etf/categories"
    );
    return response.data.data;
  },

  /**
   * ETF 검색
   *
   * @example
   * ```ts
   * const results = await etfApi.search('배당');
   * ```
   */
  search: async (keyword: string): Promise<ETF[]> => {
    return etfApi.getList({ search: keyword });
  },

  /**
   * 카테고리별 ETF 조회
   *
   * @example
   * ```ts
   * const etfs = await etfApi.getByCategory('해외주식');
   * ```
   */
  getByCategory: async (category: string): Promise<ETF[]> => {
    return etfApi.getList({ category });
  },

  /**
   * 배당 수익률 높은 순으로 ETF 조회
   *
   * @example
   * ```ts
   * const topDividend = await etfApi.getTopDividend(10);
   * ```
   */
  getTopDividend: async (limit: number = 10): Promise<ETF[]> => {
    return etfApi.getList({ sortBy: "dividend", limit });
  },

  /**
   * 시가총액 높은 순으로 ETF 조회
   *
   * @example
   * ```ts
   * const topMarketCap = await etfApi.getTopMarketCap(10);
   * ```
   */
  getTopMarketCap: async (limit: number = 10): Promise<ETF[]> => {
    return etfApi.getList({ sortBy: "marketCap", limit });
  },
};
