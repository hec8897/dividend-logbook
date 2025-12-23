/**
 * KIS API 연결 테스트 라우트
 */

import { NextResponse } from "next/server";
import { kisClient } from "@/lib/api/kis";

/**
 * KIS API 토큰 발급 테스트
 */
export async function GET() {
  try {
    // 토큰 발급 테스트
    const token = await kisClient.getAccessToken();

    return NextResponse.json({
      success: true,
      message: "KIS API 연결 성공",
      data: {
        tokenLength: token.length,
        tokenPreview: `${token.substring(0, 20)}...`,
      },
    });
  } catch (error) {
    console.error("KIS API 연결 실패:", error);

    return NextResponse.json(
      {
        success: false,
        message: "KIS API 연결 실패",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
