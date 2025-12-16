import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * 서버/클라이언트 환경에 따른 baseURL 설정
 */
const getBaseURL = () => {
  // 서버 사이드 (Node.js 환경)
  if (typeof window === "undefined") {
    // 서버에서는 절대 URL 사용
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  }
  // 클라이언트 사이드 (브라우저 환경)
  return process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
};

/**
 * Axios 인스턴스 생성 및 설정
 */
const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000, // 10초
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * 요청 전 공통 처리 (인증 토큰 추가 등)
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // 개발 환경에서 요청 로깅
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
      });
    }

    // 인증 토큰이 필요한 경우 여기서 추가
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * 응답 후 공통 처리 (에러 처리, 데이터 변환 등)
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 개발 환경에서 응답 로깅
    if (process.env.NODE_ENV === "development") {
      console.log("✅ API Response:", {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    // 에러 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우 (4xx, 5xx)
      console.error("❌ API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });

      // 상태 코드별 처리
      switch (error.response.status) {
        case 401:
          // 인증 실패
          console.error("인증이 필요합니다.");
          // 로그인 페이지로 리다이렉트 등
          break;
        case 403:
          // 권한 없음
          console.error("접근 권한이 없습니다.");
          break;
        case 404:
          // 리소스 없음
          console.error("요청한 리소스를 찾을 수 없습니다.");
          break;
        case 500:
          // 서버 에러
          console.error("서버 오류가 발생했습니다.");
          break;
        default:
          console.error("알 수 없는 오류가 발생했습니다.");
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      console.error("❌ No Response:", error.request);
      console.error("서버로부터 응답이 없습니다.");
    } else {
      // 요청 설정 중 에러 발생
      console.error("❌ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * API 요청 헬퍼 함수들
 */
export const apiClient = {
  /**
   * GET 요청
   */
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config),

  /**
   * POST 요청
   */
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config),

  /**
   * PUT 요청
   */
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config),

  /**
   * PATCH 요청
   */
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config),

  /**
   * DELETE 요청
   */
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config),
};

export default axiosInstance;
