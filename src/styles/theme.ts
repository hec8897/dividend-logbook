// 공통 테마 정의 (색상, 폰트, 간격 등)
export const theme = {
  colors: {
    primary: "#2563eb",
    secondary: "#666",
    background: "#fff",
    backgroundSecondary: "#fafafa",
    border: "#e0e0e0",
    text: "#333",
    textSecondary: "#666",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
  lineHeight: {
    base: "1.5rem",
    sm: "1.2rem",
    md: "1.5rem",
    lg: "1.8rem",
    xl: "2.1rem",
    "2xl": "2.4rem",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  fontSize: {
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
    "2xl": "2rem",
  },
  transition: {
    default: "0.2s",
    fast: "0.1s",
    slow: "0.3s",
  },
} as const;

// TypeScript 타입 추출
export type Theme = typeof theme;

// CSS 변수로 변환하는 함수
export function themeToCSSVariables(themeObj: typeof theme): string {
  const variables: string[] = [];

  // 색상 변수
  Object.entries(themeObj.colors).forEach(([key, value]) => {
    variables.push(`  --color-${key}: ${value};`);
  });

  // 간격 변수
  Object.entries(themeObj.spacing).forEach(([key, value]) => {
    variables.push(`  --spacing-${key}: ${value};`);
  });

  // border-radius 변수
  Object.entries(themeObj.borderRadius).forEach(([key, value]) => {
    variables.push(`  --radius-${key}: ${value};`);
  });

  // 폰트 크기 변수
  Object.entries(themeObj.fontSize).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    variables.push(`  --font-size-${cssKey}: ${value};`);
  });

  // transition 변수
  Object.entries(themeObj.transition).forEach(([key, value]) => {
    variables.push(`  --transition-${key}: ${value};`);
  });

  return `:root {\n${variables.join("\n")}\n}`;
}
