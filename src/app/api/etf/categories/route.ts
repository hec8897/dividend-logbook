import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/mock';

/**
 * GET /api/etf/categories
 * ETF 카테고리 목록 조회
 */
export async function GET() {
  try {
    const categories = getCategories();

    return NextResponse.json({
      success: true,
      data: categories,
      total: categories.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('ETF Categories API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

