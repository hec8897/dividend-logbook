/**
 * KIS API TanStack Query Hooks
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import { kisClient } from "./client";
import { KisApiResponse, StockPrice } from "./types";

/**
 * 주식 현재가 조회 Query
 *
 * @example
 * const { data, isLoading, error } = useStockPrice('005930');
 */
export function useStockPrice(stockCode: string) {
  return useQuery({
    queryKey: ["stock", "price", stockCode],
    queryFn: async () => {
      const response = await kisClient.authenticatedGet<
        KisApiResponse<StockPrice>
      >("/uapi/domestic-stock/v1/quotations/inquire-price", "FHKST01010100", {
        FID_COND_MRKT_DIV_CODE: "J",
        FID_INPUT_ISCD: stockCode,
      });

      if (response.data.rt_cd !== "0" || !response.data.output) {
        throw new Error(response.data.msg1 || "주식 정보 조회 실패");
      }

      return response.data.output;
    },
    enabled: !!stockCode, // stockCode가 있을 때만 실행
    staleTime: 30 * 1000, // 30초 동안 fresh
    gcTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
  });
}

/**
 * 여러 종목 동시 조회
 */
export function useMultipleStockPrices(stockCodes: string[]) {
  return useQuery({
    queryKey: ["stocks", "prices", stockCodes],
    queryFn: async () => {
      const promises = stockCodes.map((code) =>
        kisClient.authenticatedGet<KisApiResponse<StockPrice>>(
          "/uapi/domestic-stock/v1/quotations/inquire-price",
          "FHKST01010100",
          {
            FID_COND_MRKT_DIV_CODE: "J",
            FID_INPUT_ISCD: code,
          }
        )
      );

      const results = await Promise.all(promises);

      return results.map((res, index) => ({
        code: stockCodes[index],
        data: res.data.output,
        success: res.data.rt_cd === "0",
      }));
    },
    enabled: stockCodes.length > 0,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

/**
 * 주식 정보 Prefetch (미리 로딩)
 *
 * @example
 * const prefetchStock = usePrefetchStockPrice();
 * <div onMouseEnter={() => prefetchStock('005930')}>
 */
export function usePrefetchStockPrice() {
  const queryClient = useQueryClient();

  return (stockCode: string) => {
    queryClient.prefetchQuery({
      queryKey: ["stock", "price", stockCode],
      queryFn: async () => {
        const response = await kisClient.authenticatedGet<
          KisApiResponse<StockPrice>
        >("/uapi/domestic-stock/v1/quotations/inquire-price", "FHKST01010100", {
          FID_COND_MRKT_DIV_CODE: "J",
          FID_INPUT_ISCD: stockCode,
        });

        return response.data.output;
      },
    });
  };
}

// useQueryClient import 추가
import { useQueryClient } from "@tanstack/react-query";
