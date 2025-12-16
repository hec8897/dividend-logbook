# Dividend Logbook 📊

ETF 정보를 관리하고 배당 및 매도 수익을 추적하는 토이 프로젝트입니다.

## 📋 프로젝트 소개

Dividend Logbook은 개인이 보유한 ETF(상장지수펀드)의 정보를 관리하고, 배당 수익과 매도 수익을 체계적으로 정리하여 투자 성과를 한눈에 파악할 수 있도록 도와주는 애플리케이션입니다.

## ✨ 주요 기능

- **ETF 정보 관리**

  - 보유 ETF 목록 조회 및 관리
  - ETF 기본 정보 (티커, 이름, 보유 수량 등) 저장

- **배당 수익 추적**

  - 배당 내역 기록 및 조회
  - 배당 수익률 계산
  - 배당 일정 관리

- **매도 수익 관리**

  - 매도 내역 기록
  - 실현 손익 계산
  - 수익률 분석

- **포트폴리오 대시보드**
  - 전체 수익 현황 한눈에 보기
  - 기간별 수익률 통계
  - 차트 및 그래프를 통한 시각화

## 🚀 시작하기

### 필요 조건

- Node.js (버전 18 이상 권장)
- npm 또는 yarn

### 설치 방법

```bash
# 저장소 클론
git clone <repository-url>
cd dividend-logbook

# 의존성 설치
npm install
```

### 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

도메인 드리븐 아키텍처를 기반으로 설계되었습니다.

```
dividend-logbook/
├── README.md
├── src/                      # 소스 코드
│   ├── app/                  # Next.js App Router 페이지 및 레이아웃
│   │   ├── api/              # API Routes (백엔드)
│   │   │   └── etf/          # ETF 관련 API
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   ├── page.tsx          # 홈 페이지
│   │   ├── providers.tsx     # Provider 설정 (Emotion, TanStack Query)
│   │   ├── globals.css       # 전역 스타일
│   │   └── etf/              # ETF 페이지
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── domains/              # 도메인별 비즈니스 로직
│   │   ├── etf/              # ETF 정보 관리 도메인
│   │   │   ├── components/  # ETF 전용 컴포넌트
│   │   │   ├── store/        # ETF 상태 관리 (Zustand)
│   │   │   ├── types/        # ETF 타입 정의
│   │   │   ├── hooks/        # ETF 전용 훅
│   │   │   └── index.ts      # 도메인 exports
│   │   ├── dividend/         # 배당 수익 도메인
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── sale/             # 매도 수익 도메인
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   └── portfolio/        # 포트폴리오 대시보드 도메인
│   │       ├── components/
│   │       ├── store/
│   │       ├── types/
│   │       ├── hooks/
│   │       └── index.ts
│   ├── components/           # 공통 컴포넌트
│   │   ├── common/           # 공통 컴포넌트 (Header, Footer 등)
│   │   └── ui/               # 기본 UI 컴포넌트 (Button, Input 등)
│   ├── lib/                  # 유틸리티 및 라이브러리
│   │   ├── mock/             # 목업 데이터
│   │   ├── queryClient.ts    # TanStack Query 설정
│   │   └── utils/            # 유틸리티 함수
│   └── styles/               # 스타일 관련
│       ├── theme.ts          # 디자인 토큰
│       └── common.styles.ts  # 공통 스타일
├── public/                   # 정적 파일
├── next.config.js            # Next.js 설정
├── tsconfig.json             # TypeScript 설정
└── package.json              # 프로젝트 의존성
```

### 도메인 구조 설명

각 도메인은 독립적으로 관리되며, 다음과 같은 구조를 가집니다:

- **components/**: 해당 도메인에서만 사용되는 컴포넌트
- **store/**: Zustand를 사용한 도메인 전용 상태 관리
- **types/**: 도메인 관련 TypeScript 타입 정의
- **hooks/**: 도메인 전용 커스텀 훅 (필요시)
- **index.ts**: 도메인의 public API를 정의하는 export 파일

## 🛠 기술 스택

- **프론트엔드**: Next.js 16 (App Router)
- **언어**: TypeScript
- **상태 관리**: Zustand
- **스타일링**: Emotion
- **데이터 페칭**: TanStack Query (React Query)
- **백엔드**: Next.js API Routes (서버리스)
- **데이터베이스**: (추가 예정)

## 🏗️ 백엔드 아키텍처

이 프로젝트는 **Next.js API Routes**를 사용하여 백엔드를 구현합니다.

### Next.js Server (서버리스)

별도의 백엔드 서버 없이 Next.js의 내장 API Routes 기능을 활용하여 서버리스 환경에서 동작합니다.

```
src/app/api/
└── etf/
    ├── route.ts              # GET /api/etf (목록 조회)
    ├── [ticker]/route.ts     # GET /api/etf/[ticker] (상세 조회)
    └── categories/route.ts   # GET /api/etf/categories (카테고리)
```

#### 특징

- ✅ **풀스택 통합**: 프론트엔드와 백엔드가 하나의 프로젝트
- ✅ **서버리스 배포**: Vercel 등에 간편하게 배포
- ✅ **TypeScript 공유**: API와 클라이언트 간 타입 안정성
- ✅ **자동 최적화**: Next.js의 최적화 기능 활용

#### 데이터 흐름

```
클라이언트 (TanStack Query)
    ↓
fetch('/api/etf')
    ↓
Next.js API Routes
    ↓
목업 데이터 (현재) / 외부 API (향후)
    ↓
JSON 응답
```

현재는 **목업 데이터**를 사용하며, 향후 한국투자증권 Open API 등 실제 데이터로 교체 예정입니다.

## 🎨 스타일링 설정

### Emotion Provider (`src/app/providers.tsx`)

이 프로젝트는 Emotion을 사용하여 스타일링을 관리하며, 서버 사이드 렌더링(SSR)과 클라이언트 사이드 하이드레이션을 지원합니다.

#### 주요 기능

1. **Emotion Cache 생성**

   ```typescript
   const [cache] = useState(() => {
     const cache = createCache({ key: "css" });
     cache.compat = true;
     return cache;
   });
   ```

   - Emotion 스타일 캐시를 생성하여 스타일 충돌 방지
   - `key: "css"`로 CSS 클래스명 접두사 설정
   - `compat: true`로 호환 모드 활성화

2. **서버 사이드 스타일 주입**

   ```typescript
   useServerInsertedHTML(() => {
     const cssVariables = themeToCSSVariables(theme);
     return (
       <>
         <style key="theme-variables" dangerouslySetInnerHTML={{ __html: cssVariables }} />
         <style data-emotion={...} dangerouslySetInnerHTML={{ __html: ... }} />
       </>
     );
   });
   ```

   - `useServerInsertedHTML`: Next.js에서 서버 렌더링 시 `<head>`에 스타일 주입
   - 테마 CSS 변수 주입: `theme.ts`의 디자인 토큰을 CSS 변수로 변환하여 주입
   - Emotion 스타일 주입: 서버 컴포넌트에서 생성된 스타일을 주입

3. **Provider 구성**
   ```typescript
   return (
     <CacheProvider value={cache}>
       <ThemeProvider theme={theme}>{children}</ThemeProvider>
     </CacheProvider>
   );
   ```
   - `CacheProvider`: Emotion 캐시를 하위 컴포넌트에 제공
   - `ThemeProvider`: 테마 객체를 제공하여 styled 컴포넌트에서 `props.theme`으로 접근 가능

#### 작동 원리

1. **서버 렌더링**: `useServerInsertedHTML`을 통해 CSS 변수와 Emotion 스타일을 `<head>`에 주입
2. **클라이언트 하이드레이션**: 동일한 캐시와 테마를 사용하여 서버와 클라이언트 스타일 일치
3. **스타일 사용**: 하위 컴포넌트에서 Emotion styled components와 CSS 변수 모두 사용 가능

#### 장점

- ✅ **SSR 호환**: 서버에서 생성된 스타일이 클라이언트와 정확히 일치
- ✅ **성능 최적화**: 스타일을 `<head>`에 주입하여 FOUC(Flash of Unstyled Content) 방지
- ✅ **테마 공유**: Emotion과 CSS 변수 모두에서 동일한 테마 값 사용 가능
- ✅ **타입 안정성**: TypeScript로 테마 타입 추론 및 자동완성 지원

### 디자인 토큰 사용

#### Emotion에서 사용

```typescript
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

const Button = styled.button`
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
`;
```

또는 ThemeProvider를 통해:

```typescript
const Button = styled.button`
  color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md};
`;
```

#### CSS 변수로 사용 (`globals.css`)

```css
.button {
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
}
```

## 📝 사용 예시

### ETF 추가

```
티커: SPY
이름: SPDR S&P 500 ETF Trust
보유 수량: 10주
매수 평균가: $450
```

### 배당 기록

```
날짜: 2024-03-15
배당금: $4.50
배당 수익률: 1.0%
```

### 매도 기록

```
날짜: 2024-06-20
매도가: $480
수량: 5주
실현 손익: $150
```

## 🤝 기여하기

이 프로젝트는 개인 토이 프로젝트입니다. 제안이나 버그 리포트는 이슈로 등록해주세요.

## 📄 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**Note**: 이 프로젝트는 투자 조언을 제공하지 않으며, 개인적인 투자 기록 관리 목적으로 제작되었습니다.
