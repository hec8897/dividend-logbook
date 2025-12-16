import { NextRequest, NextResponse } from 'next/server';
import { getETFByTicker } from '@/lib/mock';

/**
 * GET /api/etf/[ticker]
 * 개별 ETF 상세 정보 조회
 * 
 * @param ticker - ETF 종목코드
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params;

    if (!ticker) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ticker is required',
        },
        { status: 400 }
      );
    }

    const etf = getETFByTicker(ticker);

    if (!etf) {
      return NextResponse.json(
        {
          success: false,
          error: 'ETF not found',
          message: `ETF with ticker ${ticker} does not exist`,
        },
        { status: 404 }
      );
    }

    // 목업 데이터이므로 약간의 지연 추가 (실제 API 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json({
      success: true,
      data: etf,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('ETF Detail API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch ETF detail',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

