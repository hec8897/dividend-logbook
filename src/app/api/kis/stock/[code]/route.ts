/**
 * 주식 현재가 조회 API
 *
 * 클라이언트에서는 useStockPrice() hook을 사용하는 것을 권장하지만,
 * 서버 사이드에서 필요한 경우를 위한 API Route입니다.
 */

import { NextRequest, NextResponse } from "next/server";
import { kisClient } from "@/lib/api/kis/client";
import { KisApiResponse, StockPrice } from "@/lib/api/kis/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    if (!code) {
      return NextResponse.json(
        { success: false, message: "종목코드가 필요합니다." },
        { status: 400 }
      );
    }

    const response = await kisClient.authenticatedGet<
      KisApiResponse<StockPrice>
    >("/uapi/domestic-stock/v1/quotations/inquire-price", "FHKST01010100", {
      FID_COND_MRKT_DIV_CODE: "J",
      FID_INPUT_ISCD: code,
    });

    if (response.data.rt_cd !== "0" || !response.data.output) {
      return NextResponse.json(
        {
          success: false,
          message: response.data.msg1 || "주식 정보를 가져올 수 없습니다.",
        },
        { status: 404 }
      );
    }

    const stockPrice = response.data.output;

    return NextResponse.json({
      success: true,
      data: {
        code,
        price: stockPrice.stck_prpr,
        change: stockPrice.prdy_vrss,
        changeRate: stockPrice.prdy_ctrt,
        open: stockPrice.stck_oprc,
        high: stockPrice.stck_hgpr,
        low: stockPrice.stck_lwpr,
        volume: stockPrice.acml_vol,
      },
    });
  } catch (error) {
    console.error("주식 현재가 조회 API 에러:", error);

    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
