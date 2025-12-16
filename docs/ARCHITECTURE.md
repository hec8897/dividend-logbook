# 프로젝트 아키텍처 가이드 🏗️

이 문서는 Dividend Logbook 프로젝트의 아키텍처와 주요 기술 결정 사항을 설명합니다.

## 📋 목차

- [백엔드 아키텍처](#백엔드-아키텍처)
- [데이터 페칭 전략](#데이터-페칭-전략)
- [에러 처리](#에러-처리)
- [상태 관리](#상태-관리)

---

## 백엔드 아키텍처

### Next.js API Routes (서버리스)

이 프로젝트는 **Next.js API Routes**를 사용하여 백엔드를 구현합니다.

```
src/app/api/
└── etf/
    ├── route.ts              # GET /api/etf (목록 조회)
    ├── [ticker]/route.ts     # GET /api/etf/[ticker] (상세 조회)
    └── categories/route.ts   # GET /api/etf/categories (카테고리)
```

### 특징

- ✅ **풀스택 통합**: 프론트엔드와 백엔드가 하나의 프로젝트
- ✅ **서버리스 배포**: Vercel 등에 간편하게 배포
- ✅ **TypeScript 공유**: API와 클라이언트 간 타입 안정성
- ✅ **자동 최적화**: Next.js의 최적화 기능 활용

### 데이터 흐름

```
클라이언트 (TanStack Query)
    ↓
axios (HTTP 클라이언트)
    ↓
GET /api/etf
    ↓
Next.js API Routes (서버리스 함수)
    ↓
목업 데이터 (현재) / 외부 API (향후)
    ↓
JSON 응답
    ↓
TanStack Query 캐싱
    ↓
React 컴포넌트
```

### API Route 구현 패턴

```typescript
// src/app/api/etf/route.ts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    
    // 비즈니스 로직
    const result = await fetchData(category);
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### 왜 Express/NestJS가 아닌가?

#### Next.js API Routes를 선택한 이유:

1. **서버리스 배포**
   - Vercel에 무료로 배포 가능
   - 자동 스케일링
   - 서버 관리 불필요

2. **간단한 요구사항**
   - ETF 데이터 조회
   - 배당 기록 관리
   - 간단한 CRUD

3. **타입 안정성**
   - 프론트엔드와 타입 공유
   - 빌드 타임 타입 체크

#### Express/NestJS가 필요한 경우:

- 복잡한 비즈니스 로직
- WebSocket 서버
- 대용량 파일 처리
- 특정 미들웨어 필수

### 환경별 설정

#### axios baseURL 자동 설정

```typescript
// src/lib/api/axios.ts
const getBaseURL = () => {
  // 서버 사이드 (Node.js 환경)
  if (typeof window === "undefined") {
    return "http://localhost:3000/api";  // 절대 URL
  }
  // 클라이언트 사이드 (브라우저)
  return "/api";  // 상대 URL
};
```

**이유**: 서버에는 `window.location`이 없어서 상대 경로를 해석할 수 없음

---

## 데이터 페칭 전략

### TanStack Query (React Query)

서버 상태 관리를 위해 TanStack Query를 사용합니다.

#### 주요 기능

```typescript
// 1. 기본 사용
const { data, isLoading, error } = useQuery({
  queryKey: ['etfList'],
  queryFn: () => etfApi.getList(),
});

// 2. Suspense 모드
const { data } = useSuspenseQuery({
  queryKey: ['etfList'],
  queryFn: () => etfApi.getList(),
});
```

#### 캐싱 전략

```typescript
// src/lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,     // 5분간 fresh
      gcTime: 1000 * 60 * 30,       // 30분간 캐시 유지
      refetchOnWindowFocus: false,   // 포커스 시 refetch 안함
    },
  },
});
```

#### Query Key Factory 패턴

일관된 쿼리 키 관리:

```typescript
export const queryKeys = {
  etf: {
    all: ['etf'] as const,
    lists: () => [...queryKeys.etf.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.etf.lists(), filters] as const,
    detail: (ticker: string) =>
      [...queryKeys.etf.all, 'detail', ticker] as const,
  },
};
```

---

## 에러 처리

### ErrorBoundary + Suspense 패턴

React의 선언적 에러 처리 방식을 사용합니다.

#### 구조

```
<ErrorBoundary>          ← 에러 catch
  <Suspense>             ← 로딩 처리
    <Component />        ← useSuspenseQuery
  </Suspense>
</ErrorBoundary>
```

#### ErrorBoundary 구현

```typescript
// src/components/common/ErrorBoundary.tsx
export class ErrorBoundary extends Component {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultError />;
    }
    return this.props.children;
  }
}
```

#### 왜 클래스 컴포넌트인가?

- `getDerivedStateFromError`와 `componentDidCatch`는 클래스에만 있음
- React 팀의 의도적인 설계 (에러 경계를 명확히 하기 위해)
- 함수형 컴포넌트에는 대응하는 Hook이 없음

#### 컴포넌트 단위 캡슐화

```typescript
// 재사용 가능한 패턴
export function EtfListWithBoundary() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <Suspense fallback={<LoadingUI />}>
        <EtfList />
      </Suspense>
    </ErrorBoundary>
  );
}

// 사용
<EtfListWithBoundary />  // 간단!
```

#### 장점

1. **선언적 처리**: if/else 대신 컴포넌트로 처리
2. **재사용성**: 어디서든 사용 가능
3. **격리**: 한 컴포넌트의 에러가 전체 앱을 무너뜨리지 않음
4. **타입 안정성**: useSuspenseQuery는 data가 항상 있음

---

## 상태 관리

### 서버 상태 vs 클라이언트 상태

#### 서버 상태 (TanStack Query)

```typescript
// ETF 데이터, 배당 내역 등
const { data } = useQuery({
  queryKey: ['etfList'],
  queryFn: () => etfApi.getList(),
});
```

#### 클라이언트 상태 (Zustand)

```typescript
// UI 상태, 폼 데이터 등
const useEtfStore = create((set) => ({
  selectedEtf: null,
  setSelectedEtf: (etf) => set({ selectedEtf: etf }),
}));
```

### 언제 무엇을 사용할까?

| 상태 유형 | 도구 | 예시 |
|----------|------|------|
| 서버에서 가져온 데이터 | TanStack Query | ETF 목록, 배당 내역 |
| 일시적인 UI 상태 | React State | 모달 열림/닫힘 |
| 전역 UI 상태 | Zustand | 다크모드, 언어 설정 |
| 폼 상태 | React Hook Form | 입력 값, 유효성 검사 |

---

## 서버 컴포넌트 vs 클라이언트 컴포넌트

### Next.js App Router의 핵심 개념

```typescript
// 서버 컴포넌트 (기본)
export default function Page() {
  // ❌ useQuery 불가
  // ❌ useState 불가
  // ❌ onClick 불가
  return <div>Server Component</div>;
}

// 클라이언트 컴포넌트
'use client';

export default function Page() {
  // ✅ useQuery 가능
  // ✅ useState 가능
  // ✅ onClick 가능
  return <div>Client Component</div>;
}
```

### 선택 기준

#### 서버 컴포넌트 사용
- ✅ SEO가 중요한 페이지
- ✅ 정적 콘텐츠
- ✅ 데이터베이스 직접 접근
- ✅ 초기 로딩 속도 중요

#### 클라이언트 컴포넌트 사용
- ✅ 사용자 인터랙션
- ✅ React Hooks 사용
- ✅ 브라우저 API 사용
- ✅ TanStack Query 사용

---

## 학습 포인트 💡

### 1. axios의 this 바인딩 문제

```typescript
// ❌ 잘못된 방법
const { get } = searchParams;
const value = get('key');  // Error!

// ✅ 올바른 방법
const value = searchParams.get('key');
```

**교훈**: 객체 메서드를 destructuring하면 `this` 바인딩이 풀린다.

### 2. 서버에서 상대 경로 문제

```typescript
// ❌ 서버에서 에러
axios.get('/api/etf')  // ERR_INVALID_URL

// ✅ 서버에서는 절대 URL 필요
axios.get('http://localhost:3000/api/etf')
```

**교훈**: 서버에는 `window.location`이 없어 상대 경로 해석 불가.

### 3. ErrorBoundary는 클래스 전용

```typescript
// ❌ 함수형 컴포넌트로 불가
function ErrorBoundary() {
  // useErrorBoundary()는 없음!
}

// ✅ 클래스 컴포넌트 필수
class ErrorBoundary extends Component {
  static getDerivedStateFromError() {}
  componentDidCatch() {}
}
```

**교훈**: React 팀의 의도적인 설계. 에러 경계는 명확해야 한다.

---

## 다음 단계

- [ ] 실제 API 연동 (한국투자증권 Open API)
- [ ] 데이터베이스 통합
- [ ] 인증/인가 구현
- [ ] 배당 및 매도 수익 관리 기능
- [ ] 차트 및 시각화

