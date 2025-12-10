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

