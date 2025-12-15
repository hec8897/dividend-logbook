import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import type {
  ETF,
  ETFListResponse,
  ETFDetailResponse,
  ETFCategoriesResponse,
  ETFQueryParams,
} from '../types';

/**
 * API 호출 함수들
 */
const etfApi = {
  /**
   * ETF 목록 조회
   */
  getList: async (params?: ETFQueryParams): Promise<ETF[]> => {
    const queryString = new URLSearchParams(
      Object.entries(params || {})
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    ).toString();

    const url = `/api/etf${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch ETF list');
    }

    const data: ETFListResponse = await response.json();
    return data.data;
  },

  /**
   * 개별 ETF 상세 조회
   */
  getDetail: async (ticker: string): Promise<ETF> => {
    const response = await fetch(`/api/etf/${ticker}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ETF detail: ${ticker}`);
    }

    const data: ETFDetailResponse = await response.json();
    return data.data;
  },

  /**
   * 카테고리 목록 조회
   */
  getCategories: async (): Promise<string[]> => {
    const response = await fetch('/api/etf/categories');

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data: ETFCategoriesResponse = await response.json();
    return data.data;
  },
};

/**
 * ETF 목록 조회 훅
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useEtfList();
 * const { data } = useEtfList({ category: '해외주식' });
 * const { data } = useEtfList({ search: '배당' });
 * const { data } = useEtfList({ sortBy: 'dividend', limit: 10 });
 * ```
 */
export function useEtfList(params?: ETFQueryParams) {
  return useQuery({
    queryKey: queryKeys.etf.list(params),
    queryFn: () => etfApi.getList(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

/**
 * ETF 목록 조회 훅 (Suspense 모드)
 * 
 * @example
 * ```tsx
 * // Suspense 경계 내부에서 사용
 * const { data } = useSuspenseEtfList();
 * ```
 */
export function useSuspenseEtfList(params?: ETFQueryParams) {
  return useSuspenseQuery({
    queryKey: queryKeys.etf.list(params),
    queryFn: () => etfApi.getList(params),
  });
}

/**
 * 개별 ETF 상세 조회 훅
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useEtfDetail('360750');
 * ```
 */
export function useEtfDetail(ticker: string) {
  return useQuery({
    queryKey: queryKeys.etf.detail(ticker),
    queryFn: () => etfApi.getDetail(ticker),
    enabled: !!ticker, // ticker가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분
  });
}

/**
 * ETF 검색 훅
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useEtfSearch('배당');
 * ```
 */
export function useEtfSearch(keyword: string) {
  return useQuery({
    queryKey: queryKeys.etf.search(keyword),
    queryFn: () => etfApi.getList({ search: keyword }),
    enabled: keyword.length > 0, // 검색어가 있을 때만 실행
    staleTime: 1000 * 60 * 2, // 2분
  });
}

/**
 * 카테고리별 ETF 조회 훅
 * 
 * @example
 * ```tsx
 * const { data } = useEtfByCategory('해외주식');
 * ```
 */
export function useEtfByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.etf.category(category),
    queryFn: () => etfApi.getList({ category }),
    enabled: !!category,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

/**
 * ETF 카테고리 목록 조회 훅
 * 
 * @example
 * ```tsx
 * const { data: categories } = useEtfCategories();
 * ```
 */
export function useEtfCategories() {
  return useQuery({
    queryKey: [...queryKeys.etf.all, 'categories'],
    queryFn: () => etfApi.getCategories(),
    staleTime: 1000 * 60 * 30, // 30분 (카테고리는 자주 변하지 않음)
  });
}

/**
 * 배당 수익률 높은 순으로 ETF 조회 훅
 * 
 * @example
 * ```tsx
 * const { data } = useTopDividendEtfs(10);
 * ```
 */
export function useTopDividendEtfs(limit: number = 10) {
  return useQuery({
    queryKey: [...queryKeys.etf.all, 'top-dividend', limit],
    queryFn: () => etfApi.getList({ sortBy: 'dividend', limit }),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

/**
 * 시가총액 높은 순으로 ETF 조회 훅
 * 
 * @example
 * ```tsx
 * const { data } = useTopMarketCapEtfs(10);
 * ```
 */
export function useTopMarketCapEtfs(limit: number = 10) {
  return useQuery({
    queryKey: [...queryKeys.etf.all, 'top-marketcap', limit],
    queryFn: () => etfApi.getList({ sortBy: 'marketCap', limit }),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

