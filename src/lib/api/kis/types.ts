/**
 * 한국투자증권 API 타입 정의
 */

/**
 * OAuth 토큰 응답
 */
export interface KisTokenResponse {
  access_token: string;
  access_token_token_expired: string;
  token_type: string;
  expires_in: number;
}

/**
 * API 응답 공통 형식
 */
export interface KisApiResponse<T> {
  rt_cd: string; // 응답 코드 (0: 성공)
  msg_cd: string; // 메시지 코드
  msg1: string; // 메시지
  output?: T; // 응답 데이터
}

/**
 * 주식 현재가 조회 응답
 */
export interface StockPrice {
  stck_prpr: string; // 주식 현재가
  prdy_vrss: string; // 전일 대비
  prdy_vrss_sign: string; // 전일 대비 부호
  prdy_ctrt: string; // 전일 대비율
  stck_oprc: string; // 시가
  stck_hgpr: string; // 고가
  stck_lwpr: string; // 저가
  acml_vol: string; // 누적 거래량
  acml_tr_pbmn: string; // 누적 거래대금
}

/**
 * 배당 정보
 */
export interface DividendInfo {
  stck_shrn_iscd: string; // 종목코드
  prdt_name: string; // 종목명
  divi_pay_dt: string; // 배당 지급일
  per_sto_divi_amt: string; // 주당 배당금
  divi_kind: string; // 배당 구분
}

/**
 * API 요청 헤더
 */
export interface KisRequestHeaders {
  "Content-Type": string;
  authorization: string;
  appkey: string;
  appsecret: string;
  tr_id: string;
  custtype?: string;
}

/**
 * 토큰 저장 타입
 */
export interface TokenStorage {
  token: string;
  expiresAt: number; // timestamp
}
