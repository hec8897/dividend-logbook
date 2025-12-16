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
- **상태 관리**: Zustand, TanStack Query
- **스타일링**: Emotion
- **HTTP 클라이언트**: axios
- **백엔드**: Next.js API Routes (서버리스)
- **데이터베이스**: (추가 예정)

## 📚 기술 문서

더 자세한 기술 정보는 다음 문서를 참고하세요:

- [아키텍처 가이드](./docs/ARCHITECTURE.md) - 백엔드 구조, 데이터 페칭, 에러 처리
- [스타일링 가이드](./docs/STYLING.md) - Emotion 설정, 테마 시스템, 모범 사례

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
