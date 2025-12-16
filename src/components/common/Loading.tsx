/**
 * 로딩 컴포넌트
 * Suspense fallback으로 사용
 */
export function Loading() {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ marginTop: "10px", color: "#666" }}>로딩 중...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/**
 * 간단한 스켈레톤 로딩
 */
export function SkeletonLoading() {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          height: "20px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          marginBottom: "10px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: "20px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          marginBottom: "10px",
          width: "80%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: "20px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          width: "60%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

