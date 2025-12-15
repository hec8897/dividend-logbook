import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query 설정
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분간 캐시 유지
      staleTime: 1000 * 60 * 5,
      // 캐시 데이터 30분간 보관
      gcTime: 1000 * 60 * 30,
      // 윈도우 포커스시 자동 리페칭
      refetchOnWindowFocus: false,
      // 마운트시 자동 리페칭 (개발 중에는 false)
      refetchOnMount: true,
      // 네트워크 재연결시 자동 리페칭
      refetchOnReconnect: true,
      // 재시도 설정
      retry: 1,
      // 재시도 지연
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // 뮤테이션 재시도 (기본값: 0)
      retry: 0,
    },
  },
});

/**
 * Query Key Factory
 * 일관된 쿼리 키 관리
 */
export const queryKeys = {
  etf: {
    all: ['etf'] as const,
    lists: () => [...queryKeys.etf.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.etf.lists(), filters] as const,
    details: () => [...queryKeys.etf.all, 'detail'] as const,
    detail: (ticker: string) => [...queryKeys.etf.details(), ticker] as const,
    search: (keyword: string) =>
      [...queryKeys.etf.all, 'search', keyword] as const,
    category: (category: string) =>
      [...queryKeys.etf.all, 'category', category] as const,
  },
  dividend: {
    all: ['dividend'] as const,
    lists: () => [...queryKeys.dividend.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.dividend.lists(), filters] as const,
  },
  portfolio: {
    all: ['portfolio'] as const,
    summary: () => [...queryKeys.portfolio.all, 'summary'] as const,
  },
} as const;

