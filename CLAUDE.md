# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 주요 명령어

### 개발 서버
```bash
npm run dev          # 개발 서버 실행 (http://localhost:3000)
npm run build        # 프로덕션 빌드
npm start            # 프로덕션 서버 실행
npm run lint         # ESLint 실행
```

### 환경 설정
- `.env.local` 파일에 환경변수 설정 필요
- 한국투자증권 API 사용 시 `KIS_APP_KEY`, `KIS_APP_SECRET` 필수

## 프로젝트 개요

ETF 배당 수익을 추적하는 Next.js 16 (App Router) 기반 애플리케이션입니다. 도메인 드리븐 아키텍처를 따르며, 한국투자증권 Open API와 통합되어 있습니다.

## 아키텍처

### 도메인 드리븐 설계
프로젝트는 4개의 독립적인 도메인으로 구성됩니다:

```
src/domains/
├── etf/              # ETF 정보 관리
├── dividend/         # 배당 수익 추적
├── sale/             # 매도 수익 관리
└── portfolio/        # 포트폴리오 대시보드
```

각 도메인은 다음 구조를 따릅니다:
- `components/` - 도메인 전용 컴포넌트
- `store/` - Zustand 상태 관리 (`use{Domain}Store.ts`)
- `types/` - TypeScript 타입 정의
- `hooks/` - 커스텀 훅 (필요시)
- `index.ts` - 도메인의 public API

### 디렉토리 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (서버리스)
│   │   ├── etf/          # ETF API
│   │   └── kis/          # 한국투자증권 API
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx      # TanStack Query, Emotion 설정
├── domains/               # 도메인별 비즈니스 로직
├── components/
│   ├── common/           # 공통 컴포넌트 (Header, ErrorBoundary 등)
│   └── ui/               # 기본 UI 컴포넌트
├── lib/
│   ├── api/              # API 클라이언트
│   │   ├── axios.ts     # Axios 설정
│   │   ├── kis/         # 한국투자증권 API 클라이언트
│   │   └── etf.ts       # ETF API
│   ├── config/           # 환경변수 설정
│   ├── queryClient.ts    # TanStack Query 설정
│   └── utils/            # 유틸리티 함수
└── styles/
    ├── theme.ts          # 디자인 토큰
    └── common.styles.ts  # 공통 스타일
```

### Path Aliases
`tsconfig.json`에 정의된 경로 별칭:
- `@/*` → `./src/*`
- `@/domains/*` → `./src/domains/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/styles/*` → `./src/styles/*`

## 핵심 기술 스택

### 상태 관리
- **TanStack Query**: 서버 상태 관리 (ETF 데이터, API 응답 캐싱)
- **Zustand**: 클라이언트 상태 관리 (UI 상태, 폼 데이터)

#### 상태 관리 선택 기준
| 상태 유형 | 도구 | 예시 |
|----------|------|------|
| 서버에서 가져온 데이터 | TanStack Query | ETF 목록, 배당 내역 |
| 일시적인 UI 상태 | React State | 모달 열림/닫힘 |
| 전역 UI 상태 | Zustand | 선택된 ETF, 필터 상태 |

#### Query Key Factory 패턴
`src/lib/queryClient.ts`에서 일관된 쿼리 키 관리:
```typescript
queryKeys.etf.detail('SPY')      // ['etf', 'detail', 'SPY']
queryKeys.dividend.list(filters) // ['dividend', 'list', {...filters}]
```

### 스타일링
- **Emotion**: CSS-in-JS
- 테마: `src/styles/theme.ts`
- 공통 스타일: `src/styles/common.styles.ts`
- Material-UI (MUI) 컴포넌트 사용

## 백엔드: Next.js API Routes

### 특징
- 서버리스 함수로 구현
- 프론트엔드와 타입 공유
- `src/app/api/` 디렉토리에 위치

### axios baseURL 환경별 설정
**중요**: 서버 사이드에서는 절대 URL 필요 (`src/lib/api/axios.ts` 참조)
```typescript
// 서버: http://localhost:3000/api
// 클라이언트: /api (상대 경로)
```

이유: 서버에는 `window.location`이 없어 상대 경로 해석 불가

## 한국투자증권 API 통합

### 구조
```
src/lib/api/kis/
├── client.ts        # KIS API 클라이언트 (토큰 자동 관리)
├── types.ts         # 타입 정의
├── queries.ts       # TanStack Query 훅
└── index.ts
```

### 중요 사항
- 환경변수 필수: `KIS_APP_KEY`, `KIS_APP_SECRET`
- 토큰은 자동으로 발급 및 갱신됨
- 클라이언트에서 직접 호출 금지 → Next.js API Routes를 통해서만 접근
- 테스트: `http://localhost:3000/api/kis/test`

### 사용 예시
```typescript
// TanStack Query 훅 사용
const { data } = useStockPrice('005930'); // 삼성전자
```

## 에러 처리 패턴

### ErrorBoundary + Suspense
선언적 에러 처리 방식:

```typescript
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<LoadingUI />}>
    <Component />  {/* useSuspenseQuery 사용 */}
  </Suspense>
</ErrorBoundary>
```

**주의**: ErrorBoundary는 클래스 컴포넌트로만 구현 가능 (`getDerivedStateFromError`, `componentDidCatch`는 클래스 전용)

## 코딩 규칙 (`.cursorrules` 기반)

### Zustand Store 패턴
```typescript
// use{Domain}Store.ts
interface DividendState {
  dividends: Dividend[];
  addDividend: (dividend: Dividend) => void;
}

export const useDividendStore = create<DividendState>((set) => ({
  dividends: [],
  addDividend: (dividend) => set((state) => ({
    dividends: [...state.dividends, dividend]
  })),
}));
```

### 컴포넌트 위치 규칙
- 공통 컴포넌트: `src/components/common/`
- UI 컴포넌트: `src/components/ui/`
- 도메인 전용: `src/domains/{domain}/components/`

### 파일 네이밍
- 컴포넌트: `PascalCase.tsx` (예: `EtfList.tsx`)
- 유틸리티: `camelCase.ts` (예: `formatDate.ts`)
- Store: `use{Domain}Store.ts` (예: `useEtfStore.ts`)

### Import 순서
1. React 및 Next.js 관련
2. 외부 라이브러리
3. 프로젝트 내부 컴포넌트
4. 프로젝트 내부 유틸리티
5. 타입 정의
6. 스타일 관련

## Next.js App Router 특징

### 서버 vs 클라이언트 컴포넌트
- 기본은 서버 컴포넌트
- 인터랙션, Hooks, TanStack Query 사용 시 `'use client'` 명시 필요

### 주의사항
- 서버 컴포넌트에서는 `useState`, `useQuery`, `onClick` 등 사용 불가
- axios 메서드 destructuring 시 `this` 바인딩 주의

## 주요 학습 포인트

### 1. axios this 바인딩 문제
```typescript
// ❌ 잘못된 방법
const { get } = searchParams;
const value = get('key');  // Error!

// ✅ 올바른 방법
const value = searchParams.get('key');
```

### 2. 서버에서 상대 경로 문제
```typescript
// ❌ 서버에서 에러
axios.get('/api/etf')

// ✅ 서버에서는 절대 URL 필요
axios.get('http://localhost:3000/api/etf')
```

### 3. TanStack Query 캐싱 전략
- `staleTime`: 데이터가 fresh한 시간 (5분)
- `gcTime`: 캐시 보관 시간 (30분)
- `refetchOnWindowFocus`: false (포커스 시 자동 갱신 안 함)

## 참고 문서

프로젝트 내 상세 문서:
- `docs/ARCHITECTURE.md` - 백엔드 구조, 데이터 페칭, 에러 처리
- `docs/STYLING.md` - Emotion 설정, 테마 시스템
- `docs/KIS_API.md` - 한국투자증권 API 연동 가이드
- `docs/TANSTACK_QUERY.md` - TanStack Query 사용법
