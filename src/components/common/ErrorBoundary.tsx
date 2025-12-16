"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary 컴포넌트
 * 하위 컴포넌트에서 발생한 에러를 catch하여 fallback UI를 표시
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // fallback prop이 있으면 사용, 없으면 기본 UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: "20px", border: "1px solid red" }}>
          <h2>⚠️ 오류가 발생했습니다</h2>
          <p>{this.state.error?.message || "알 수 없는 오류"}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * 에러 폴백 컴포넌트
 */
export function ErrorFallback({ error, reset }: { error?: Error; reset?: () => void }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #ff4444",
        borderRadius: "8px",
        backgroundColor: "#fff5f5",
        margin: "20px 0",
      }}
    >
      <h2 style={{ color: "#d32f2f" }}>⚠️ 오류가 발생했습니다</h2>
      <p style={{ color: "#666" }}>
        {error?.message || "데이터를 불러오는 중 문제가 발생했습니다."}
      </p>
      {reset && (
        <button
          onClick={reset}
          style={{
            padding: "10px 20px",
            backgroundColor: "#d32f2f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          다시 시도
        </button>
      )}
    </div>
  );
}

