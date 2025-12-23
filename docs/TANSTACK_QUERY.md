# TanStack Query + KIS API 가이드

## 📋 목차

- [왜 TanStack Query?](#왜-tanstack-query)
- [설치](#설치)
- [기존 코드 vs 새 코드](#기존-코드-vs-새-코드)
- [사용 방법](#사용-방법)
- [주요 기능](#주요-기능)

---

## 🤔 왜 TanStack Query?

### 기존 방식의 문제점

```typescript
// ❌ 직접 구현하면 복잡함
function StockPrice({ code }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/stock/${code}`)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [code]);

  // 캐싱은? 재시도는? 백그라운드 갱신은?
  // 다 직접 구현해야 함...
}
```

### TanStack Query 사용

```typescript
// ✅ 간단하고 강력함
function StockPrice({ code }) {
  const { data, isLoading, error } = useStockPrice(code);

  // 캐싱, 재시도, 갱신, 낙관적 업데이트 등
  // 모두 자동으로 처리!
}
```

---

## 📦 설치

```bash
npm install @tanstack/react-query
```

---

## 🔄 기존 코드 vs 새 코드

### 변경 사항 요약

| 구분          | 이전 방식 | 현재 (TanStack Query) | 설명                            |
| ------------- | --------- | --------------------- | ------------------------------- |
| **토큰 관리** | ✅ 필요   | ✅ 필요               | React Query는 토큰을 관리 안 함 |
| **헤더 생성** | ✅ 필요   | ✅ 필요               | 인증 헤더는 여전히 필요         |
| **캐싱**      | ❌ 수동   | ✅ React Query가 처리 | 더 강력한 캐싱                  |
| **로딩/에러** | ❌ 수동   | ✅ React Query가 처리 | 자동 상태 관리                  |
| **재시도**    | ❌ 없음   | ✅ React Query가 처리 | 자동 재시도                     |
| **get/post**  | ✅ 구현됨 | ✅ 간소화             | React Query와 조합              |

### 필요한 것 / 불필요한 것

#### ✅ 여전히 필요한 것

```typescript
// client.ts
class KisApiClient {
  // 1. 토큰 관리 (React Query는 토큰을 모름)
  async getAccessToken() {}

  // 2. 인증된 요청 헬퍼
  async authenticatedGet() {}
  async authenticatedPost() {}
}
```

#### ❌ React Query가 대체하는 것

```typescript
// 이제 불필요:
- 직접 만든 캐싱 로직
- useState로 loading/error 관리
- useEffect로 데이터 fetching
- 수동 에러 핸들링
- 재시도 로직
```

---

## 🚀 사용 방법

### 1. Provider 설정

```typescript
// src/app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30초 동안 fresh
            gcTime: 5 * 60 * 1000, // 5분 캐시
            retry: 1, // 실패 시 1번 재시도
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 2. Query Hook 사용

```typescript
// 컴포넌트에서
import { useStockPrice } from "@/lib/api/kis/queries";

function MyComponent() {
  const { data, isLoading, error, refetch } = useStockPrice("005930");

  if (isLoading) return <div>로딩...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div>
      <h1>현재가: {data.stck_prpr}</h1>
      <button onClick={() => refetch()}>새로고침</button>
    </div>
  );
}
```

### 3. 여러 종목 동시 조회

```typescript
const { data } = useMultipleStockPrices(["005930", "000660", "035420"]);

data?.map((stock) => (
  <div key={stock.code}>
    {stock.code}: {stock.data?.stck_prpr}
  </div>
));
```

---

## 🎯 주요 기능

### 1. 자동 캐싱

```typescript
// 첫 호출: API 요청
const { data } = useStockPrice("005930");

// 30초 내 같은 호출: 캐시 사용 (API 요청 안 함!)
const { data } = useStockPrice("005930");
```

### 2. 백그라운드 갱신

```typescript
// 화면을 다시 보면 자동으로 최신 데이터 가져옴
const { data } = useStockPrice("005930", {
  refetchOnWindowFocus: true, // 창 포커스 시 갱신
  refetchInterval: 60000, // 1분마다 자동 갱신
});
```

### 3. 낙관적 업데이트

```typescript
const mutation = useMutation({
  mutationFn: updateStock,
  onMutate: async (newData) => {
    // 즉시 UI 업데이트
    await queryClient.cancelQueries(["stock"]);
    queryClient.setQueryData(["stock"], newData);
  },
});
```

### 4. Prefetching (미리 로딩)

```typescript
const prefetch = usePrefetchStockPrice();

// 마우스 올리면 미리 로딩
<div onMouseEnter={() => prefetch("005930")}>삼성전자</div>;
```

### 5. 조건부 쿼리

```typescript
// enabled: false면 실행 안 함
const { data } = useStockPrice(code, {
  enabled: !!code && isMarketOpen,
});
```

---

## 📊 성능 비교

| 기능                | 직접 구현      | TanStack Query   |
| ------------------- | -------------- | ---------------- |
| **캐싱**            | 수동 구현 필요 | ✅ 자동          |
| **중복 요청 방지**  | 복잡함         | ✅ 자동          |
| **백그라운드 갱신** | 직접 구현      | ✅ 자동          |
| **재시도**          | 직접 구현      | ✅ 자동          |
| **낙관적 업데이트** | 매우 복잡      | ✅ 간단          |
| **개발자 도구**     | 없음           | ✅ DevTools 제공 |

---

## 🎨 실전 예시

### 주식 포트폴리오 대시보드

```typescript
function PortfolioDashboard() {
  const stocks = ["005930", "000660", "035420"];

  const queries = stocks.map((code) => ({
    ...useStockPrice(code),
    code,
  }));

  const isLoading = queries.some((q) => q.isLoading);
  const hasError = queries.some((q) => q.error);

  if (isLoading) return <Loading />;
  if (hasError) return <Error />;

  return (
    <div>
      {queries.map(({ code, data }) => (
        <StockCard key={code} code={code} data={data} />
      ))}
    </div>
  );
}
```

### 실시간 업데이트

```typescript
function RealtimeStock({ code }) {
  const { data } = useStockPrice(code, {
    refetchInterval: 5000, // 5초마다 갱신
    refetchIntervalInBackground: true, // 백그라운드에서도
  });

  return <div>{data?.stck_prpr}</div>;
}
```

---

## 🔧 마이그레이션 가이드

### Step 1: TanStack Query 설치

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Step 2: queries.ts 추가

이미 생성됨: `src/lib/api/kis/queries.ts`

### Step 3: Providers 업데이트

```typescript
// src/app/providers.tsx에 QueryClientProvider 추가
```

### Step 4: 컴포넌트 마이그레이션

```typescript
// Before
useEffect(() => {
  fetch("/api/stock/005930")
    .then((res) => res.json())
    .then(setData);
}, []);

// After
const { data } = useStockPrice("005930");
```

---

## 💡 베스트 프랙티스

### 1. Query Key 구조화

```typescript
// ✅ 좋음: 계층적 구조
["stock", "price", "005930"][("stock", "dividend", "005930")][
  ("portfolio", "summary")
][
  // ❌ 나쁨: 플랫한 구조
  "stockPrice005930"
];
```

### 2. staleTime vs gcTime

```typescript
{
  staleTime: 30 * 1000,  // 30초 동안 "신선함"
  gcTime: 5 * 60 * 1000, // 5분 후 가비지 컬렉션
}

// staleTime: 데이터가 언제까지 최신인가?
// gcTime: 캐시를 언제까지 보관할까?
```

### 3. 에러 처리

```typescript
const { data, error, isError } = useStockPrice(code);

if (isError) {
  // 전역 에러: ErrorBoundary 사용
  // 로컬 에러: 컴포넌트에서 처리
  return <ErrorDisplay error={error} />;
}
```

---

## 🐛 트러블슈팅

### Q1: 캐시가 업데이트 안 됨

```typescript
// 수동으로 무효화
queryClient.invalidateQueries(["stock", "price", code]);

// 또는 refetch
refetch();
```

### Q2: 토큰 만료 에러

```typescript
// kisClient의 getAccessToken()이 자동으로 갱신
// 실패하면 에러 발생 → React Query가 재시도
```

### Q3: 너무 많은 API 호출

```typescript
// staleTime 늘리기
const { data } = useStockPrice(code, {
  staleTime: 5 * 60 * 1000, // 5분
});
```

---

## 📚 참고 자료

- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [Query Key Structure](https://tkdodo.eu/blog/effective-react-query-keys)

---

## ✅ 체크리스트

### 마이그레이션 완료 체크

- [ ] @tanstack/react-query 설치
- [ ] QueryClientProvider 추가
- [ ] client.ts 확인
- [ ] queries.ts 생성
- [ ] 기존 컴포넌트 마이그레이션
- [ ] DevTools 확인

### 최적화 체크

- [ ] staleTime 적절히 설정
- [ ] Query Key 구조화
- [ ] 에러 핸들링 추가
- [ ] Prefetching 활용
- [ ] 중복 요청 제거 확인
