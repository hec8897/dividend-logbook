/**
 * 환경변수 설정
 *
 * 서버 사이드에서만 접근 가능한 환경변수를 관리합니다.
 */

interface KisConfig {
  appKey: string;
  appSecret: string;
  baseUrl: string;
  accountNumber?: string;
  accountCode?: string;
}

/**
 * 한국투자증권 API 설정
 */
export const kisConfig: KisConfig = {
  appKey: process.env.KIS_APP_KEY || "",
  appSecret: process.env.KIS_APP_SECRET || "",
  baseUrl:
    process.env.KIS_BASE_URL || "https://openapi.koreainvestment.com:9443",
  accountNumber: process.env.KIS_ACCOUNT_NUMBER,
  accountCode: process.env.KIS_ACCOUNT_CODE,
};

/**
 * 환경변수 검증
 * 필수 환경변수가 설정되지 않았을 경우 에러를 발생시킵니다.
 */
export function validateKisConfig(): void {
  if (!kisConfig.appKey) {
    throw new Error("KIS_APP_KEY 환경변수가 설정되지 않았습니다.");
  }

  if (!kisConfig.appSecret) {
    throw new Error("KIS_APP_SECRET 환경변수가 설정되지 않았습니다.");
  }

  if (!kisConfig.baseUrl) {
    throw new Error("KIS_BASE_URL 환경변수가 설정되지 않았습니다.");
  }
}

/**
 * 개발 모드 확인
 */
export const isDevelopment = process.env.NODE_ENV === "development";

/**
 * 프로덕션 모드 확인
 */
export const isProduction = process.env.NODE_ENV === "production";
