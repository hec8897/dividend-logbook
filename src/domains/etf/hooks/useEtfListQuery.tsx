"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { etfApi } from "@/lib/api";

/**
 * ETF 목록 조회 (Suspense 모드)
 * ErrorBoundary + Suspense와 함께 사용
 */
export const useSuspenseEtfListQuery = () => {
  const query = useQuery({
    queryKey: ["etfList"],
    queryFn: () => etfApi.getList(),
  });
  return query;
};
