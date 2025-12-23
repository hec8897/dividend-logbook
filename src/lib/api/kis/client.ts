/**
 * 한국투자증권 API 클라이언트
 */

import axios, { AxiosInstance } from "axios";
import { kisConfig, validateKisConfig } from "@/lib/config/env";
import { KisTokenResponse, TokenStorage } from "./types";

/**
 * KIS API 클라이언트
 *
 * TanStack Query와 함께 사용하도록 최적화되어 있습니다.
 * 토큰 관리와 인증 헤더 생성을 담당합니다.
 */
class KisApiClient {
  private axiosInstance: AxiosInstance;
  private tokenStorage: TokenStorage | null = null;

  constructor() {
    validateKisConfig();

    this.axiosInstance = axios.create({
      baseURL: kisConfig.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Access Token 발급 및 캐싱
   * (React Query는 이 토큰을 관리하지 않으므로 여전히 필요)
   */
  async getAccessToken(): Promise<string> {
    if (this.tokenStorage && this.tokenStorage.expiresAt > Date.now()) {
      return this.tokenStorage.token;
    }

    try {
      const response = await this.axiosInstance.post<KisTokenResponse>(
        "/oauth2/tokenP",
        {
          grant_type: "client_credentials",
          appkey: kisConfig.appKey,
          appsecret: kisConfig.appSecret,
        }
      );

      const { access_token, expires_in } = response.data;

      this.tokenStorage = {
        token: access_token,
        expiresAt: Date.now() + (expires_in - 60) * 1000,
      };

      return access_token;
    } catch (error) {
      console.error("KIS API Token 발급 실패:", error);
      throw new Error("인증 토큰 발급에 실패했습니다.");
    }
  }

  /**
   * 인증된 Axios 인스턴스 반환
   */
  async getAuthenticatedAxios(): Promise<AxiosInstance> {
    const token = await this.getAccessToken();

    // 매번 새로운 인스턴스를 만들지 않고 헤더만 업데이트
    const instance = axios.create({
      baseURL: kisConfig.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        appkey: kisConfig.appKey,
        appsecret: kisConfig.appSecret,
      },
    });

    return instance;
  }

  /**
   * 간단한 헬퍼: TR_ID와 함께 GET 요청
   */
  async authenticatedGet<T>(url: string, trId: string, params?: any) {
    const axios = await this.getAuthenticatedAxios();
    return axios.get<T>(url, {
      params,
      headers: { tr_id: trId },
    });
  }

  /**
   * 간단한 헬퍼: TR_ID와 함께 POST 요청
   */
  async authenticatedPost<T>(url: string, trId: string, data?: any) {
    const axios = await this.getAuthenticatedAxios();
    return axios.post<T>(url, data, {
      headers: { tr_id: trId },
    });
  }
}

export const kisClient = new KisApiClient();
