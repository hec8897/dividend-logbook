# 한국투자증권 API 연동 가이드

## 📋 목차

- [환경 설정](#환경-설정)
- [API 구조](#api-구조)
- [사용 방법](#사용-방법)
- [API 테스트](#api-테스트)
- [주요 기능](#주요-기능)

---

## 🔧 환경 설정

### 1. API 키 발급

1. [한국투자증권 Open API](https://apiportal.koreainvestment.com/) 접속
2. 회원가입 및 로그인
3. API 신청 → App Key, App Secret 발급

### 2. 환경변수 설정

`.env.local` 파일에 발급받은 키 입력:

```bash
# KIS API App Key
KIS_APP_KEY=your_app_key_here

# KIS API App Secret
KIS_APP_SECRET=your_app_secret_here

# KIS API Base URL (실전투자)
KIS_BASE_URL=https://openapi.koreainvestment.com:9443

# 계좌 정보 (선택)
KIS_ACCOUNT_NUMBER=your_account_number
KIS_ACCOUNT_CODE=your_account_code
```

**⚠️ 주의**: `.env.local` 파일은 Git에 커밋하지 마세요!

---

## 📂 API 구조

```
src/lib/
├── config/
│   └── env.ts              # 환경변수 설정 및 검증
└── api/
    └── kis/
        ├── client.ts       # KIS API 클라이언트 (토큰 관리)
        ├── types.ts        # 타입 정의
        ├── stock.ts        # 주식 관련 API
        └── index.ts        # Export

src/app/api/
└── kis/
    ├── test/
    │   └── route.ts        # 연결 테스트 API
    └── stock/
        └── [code]/
            └── route.ts    # 주식 현재가 조회 API
```

---

## 🚀 사용 방법

### 1. 서버 사이드에서 직접 사용

```typescript
import { kisClient } from "@/lib/api/kis";
import { getStockPrice } from "@/lib/api/kis/stock";

// 주식 현재가 조회
const stockPrice = await getStockPrice("005930"); // 삼성전자

console.log(stockPrice?.stck_prpr); // 현재가
```

### 2. Next.js API Routes 사용

클라이언트에서는 Next.js API Routes를 통해 접근:

```typescript
// 클라이언트 컴포넌트
const response = await fetch("/api/kis/stock/005930");
const data = await response.json();

console.log(data.data.price); // 현재가
```

---

## 🧪 API 테스트

### 1. 개발 서버 실행

```bash
npm run dev
```

### 2. 연결 테스트

브라우저에서 접속:

```
http://localhost:3000/api/kis/test
```

**성공 응답 예시:**

```json
{
  "success": true,
  "message": "KIS API 연결 성공",
  "data": {
    "tokenLength": 466,
    "tokenPreview": "eyJ0eXAiOiJKV1QiLCJ..."
  }
}
```

### 3. 주식 현재가 조회 테스트

```
http://localhost:3000/api/kis/stock/005930
```

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "code": "005930",
    "price": "72500",
    "change": "500",
    "changeRate": "0.69",
    "open": "72000",
    "high": "72800",
    "low": "71900",
    "volume": "12345678"
  }
}
```

---

## 🎯 주요 기능

### 1. 토큰 자동 관리

- Access Token 자동 발급 및 갱신
- 토큰 캐싱으로 불필요한 API 호출 방지

### 2. 주식 현재가 조회

```typescript
import { getStockPrice } from "@/lib/api/kis/stock";

const price = await getStockPrice("005930"); // 삼성전자
```

### 3. 여러 종목 동시 조회

```typescript
import { getMultipleStockPrices } from "@/lib/api/kis/stock";

const prices = await getMultipleStockPrices([
  "005930", // 삼성전자
  "000660", // SK하이닉스
  "035420", // NAVER
]);
```

---

## 📖 주요 종목 코드

| 종목명         | 종목코드 |
| -------------- | -------- |
| 삼성전자       | 005930   |
| SK하이닉스     | 000660   |
| NAVER          | 035420   |
| 카카오         | 035720   |
| LG에너지솔루션 | 373220   |
| 현대차         | 005380   |
| 기아           | 000270   |

---

## 🔐 보안 고려사항

1. **환경변수 관리**

   - `.env.local`은 절대 Git에 커밋 금지
   - `.env.example`만 템플릿으로 관리

2. **API 키 노출 방지**

   - 클라이언트에서 직접 KIS API 호출 금지
   - Next.js API Routes를 통해서만 접근

3. **에러 처리**
   - API 키 검증 로직 포함
   - 에러 발생 시 민감한 정보 노출 방지

---

## 🐛 트러블슈팅

### Token 발급 실패

```
Error: KIS_APP_KEY 환경변수가 설정되지 않았습니다.
```

→ `.env.local` 파일 확인 및 개발 서버 재시작

### CORS 에러

→ Next.js API Routes 사용 (클라이언트에서 직접 호출 불가)

### 401 Unauthorized

→ App Key, App Secret 확인

---

## 📚 참고 자료

- [한국투자증권 Open API 문서](https://apiportal.koreainvestment.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
