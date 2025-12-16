# 스타일링 가이드 🎨

이 문서는 Dividend Logbook 프로젝트의 스타일링 시스템을 설명합니다.

## 📋 목차

- [Emotion 설정](#emotion-설정)
- [테마 시스템](#테마-시스템)
- [스타일링 패턴](#스타일링-패턴)
- [모범 사례](#모범-사례)

---

## Emotion 설정

### Emotion Provider

이 프로젝트는 Emotion을 사용하여 스타일링을 관리하며, 서버 사이드 렌더링(SSR)과 클라이언트 사이드 하이드레이션을 지원합니다.

#### 주요 기능

**1. Emotion Cache 생성**

```typescript
// src/app/providers.tsx
const [cache] = useState(() => {
  const cache = createCache({ key: "css" });
  cache.compat = true;
  return cache;
});
```

- Emotion 스타일 캐시를 생성하여 스타일 충돌 방지
- `key: "css"`로 CSS 클래스명 접두사 설정
- `compat: true`로 호환 모드 활성화

**2. 서버 사이드 스타일 주입**

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

**3. Provider 구성**

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

```
1. 서버 렌더링
   ↓
   useServerInsertedHTML()
   ↓
   CSS 변수와 Emotion 스타일을 <head>에 주입
   ↓
2. HTML 전송

3. 클라이언트 하이드레이션
   ↓
   동일한 캐시와 테마 사용
   ↓
   서버와 클라이언트 스타일 일치
```

#### 장점

- ✅ **SSR 호환**: 서버에서 생성된 스타일이 클라이언트와 정확히 일치
- ✅ **성능 최적화**: 스타일을 `<head>`에 주입하여 FOUC(Flash of Unstyled Content) 방지
- ✅ **테마 공유**: Emotion과 CSS 변수 모두에서 동일한 테마 값 사용 가능
- ✅ **타입 안정성**: TypeScript로 테마 타입 추론 및 자동완성 지원

---

## 테마 시스템

### 디자인 토큰

```typescript
// src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#4caf50',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  // ...
};
```

### 사용 방법

#### 1. Emotion Styled Components

```typescript
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

// 직접 import
const Button = styled.button`
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
`;

// ThemeProvider 사용
const Button = styled.button`
  color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md};
`;
```

#### 2. CSS 변수

```css
/* globals.css */
.button {
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
}
```

#### 3. 인라인 스타일

```typescript
<div style={{ color: theme.colors.primary }}>
  Hello
</div>
```

---

## 스타일링 패턴

### 1. Styled Components (권장)

```typescript
// 컴포넌트 파일 내부에 정의
const Container = styled.div`
  padding: ${theme.spacing.md};
  background: ${theme.colors.background};
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.xl};
`;

export function MyComponent() {
  return (
    <Container>
      <Title>Hello</Title>
    </Container>
  );
}
```

### 2. CSS Modules (간단한 경우)

```typescript
// styles.module.css
.container {
  padding: var(--spacing-md);
}

// Component.tsx
import styles from './styles.module.css';

export function MyComponent() {
  return <div className={styles.container}>Hello</div>;
}
```

### 3. Inline Styles (동적 값)

```typescript
export function MyComponent({ width }: { width: number }) {
  return (
    <div style={{ width: `${width}px` }}>
      Dynamic Width
    </div>
  );
}
```

---

## 모범 사례

### 1. 컴포넌트별 스타일 분리

```typescript
// ✅ Good
// components/Button/index.tsx
const StyledButton = styled.button`
  // 스타일
`;

export function Button() {
  return <StyledButton>Click</StyledButton>;
}
```

### 2. 테마 일관성 유지

```typescript
// ✅ Good - 테마 사용
const Box = styled.div`
  padding: ${theme.spacing.md};
  color: ${theme.colors.primary};
`;

// ❌ Bad - 하드코딩
const Box = styled.div`
  padding: 16px;
  color: #1976d2;
`;
```

### 3. 반응형 디자인

```typescript
const Container = styled.div`
  padding: ${theme.spacing.sm};
  
  @media (min-width: 768px) {
    padding: ${theme.spacing.md};
  }
  
  @media (min-width: 1024px) {
    padding: ${theme.spacing.lg};
  }
`;
```

### 4. Props 기반 스타일링

```typescript
const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.md};
  background: ${props => 
    props.variant === 'primary' 
      ? theme.colors.primary 
      : theme.colors.secondary
  };
`;

// 사용
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
```

### 5. 스타일 재사용

```typescript
// 공통 스타일
const baseButtonStyles = css`
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
`;

const PrimaryButton = styled.button`
  ${baseButtonStyles}
  background: ${theme.colors.primary};
`;

const SecondaryButton = styled.button`
  ${baseButtonStyles}
  background: ${theme.colors.secondary};
`;
```

---

## 성능 최적화

### 1. 스타일 메모이제이션

```typescript
import { useMemo } from 'react';

export function MyComponent({ color }: { color: string }) {
  const styles = useMemo(() => ({
    color,
    padding: theme.spacing.md,
  }), [color]);
  
  return <div style={styles}>Hello</div>;
}
```

### 2. CSS-in-JS 최적화

```typescript
// ✅ Good - 컴포넌트 외부에 정의
const Container = styled.div`
  padding: ${theme.spacing.md};
`;

// ❌ Bad - 컴포넌트 내부에 정의 (매번 재생성)
export function MyComponent() {
  const Container = styled.div`
    padding: ${theme.spacing.md};
  `;
  return <Container />;
}
```

---

## 다크모드 지원 (향후)

```typescript
// 다크모드 테마 추가
export const darkTheme = {
  colors: {
    background: '#121212',
    text: '#ffffff',
    primary: '#90caf9',
    // ...
  },
};

// Provider에서 테마 전환
const [isDark, setIsDark] = useState(false);
const currentTheme = isDark ? darkTheme : lightTheme;

<ThemeProvider theme={currentTheme}>
  {children}
</ThemeProvider>
```

---

## 학습 포인트 💡

### 1. SSR과 Emotion

- 서버에서 스타일을 생성하여 HTML에 포함
- 클라이언트에서 동일한 스타일 재사용
- FOUC 방지

### 2. CSS 변수의 장점

- JavaScript 없이도 동적 스타일링 가능
- 브라우저 네이티브 기능
- 성능 우수

### 3. Styled Components의 장점

- 컴포넌트와 스타일이 함께 위치
- TypeScript 타입 안정성
- 동적 스타일링 쉬움

---

## 참고 자료

- [Emotion 공식 문서](https://emotion.sh/)
- [Next.js Styling 가이드](https://nextjs.org/docs/app/building-your-application/styling)
- [CSS Variables 가이드](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

