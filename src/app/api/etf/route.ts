import { NextRequest, NextResponse } from "next/server";
import {
  mockETFList,
  getETFsByCategory,
  getETFsSortedByDividend,
  getETFsSortedByMarketCap,
  searchETFs,
  getCategories,
} from "@/lib/mock";

/**
 * GET /api/etf
 * ETF 목록 조회 API
 *
 * Query Parameters:
 * - category: 카테고리별 필터링
 * - search: 검색어 (종목명 또는 티커)
 * - sortBy: 정렬 기준 (dividend, marketCap)
 * - limit: 결과 개수 제한
 */
export async function GET(request: NextRequest) {
  try {
    const { get } = request.nextUrl.searchParams;
    const category = get("category");
    const search = get("search");
    const sortBy = get("sortBy");
    const limit = get("limit");

    let result = mockETFList;

    // 카테고리 필터링
    if (category) {
      result = getETFsByCategory(category);
    }

    // 검색
    if (search) {
      result = searchETFs(search);
    }

    // 정렬
    if (sortBy === "dividend") {
      result = getETFsSortedByDividend();
    } else if (sortBy === "marketCap") {
      result = getETFsSortedByMarketCap();
    }

    // 결과 개수 제한
    if (limit) {
      const limitNum = parseInt(limit, 10);
      result = result.slice(0, limitNum);
    }

    // 목업 데이터이므로 약간의 지연 추가 (실제 API 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("ETF API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch ETF data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/etf/categories
 * 카테고리 목록 조회
 */
export async function OPTIONS() {
  const categories = getCategories();

  return NextResponse.json({
    success: true,
    data: categories,
    timestamp: new Date().toISOString(),
  });
}
