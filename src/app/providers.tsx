"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { theme, themeToCSSVariables } from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";

function EmotionProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const cssVariables = themeToCSSVariables(theme);
    return (
      <>
        <style
          key="theme-variables"
          dangerouslySetInnerHTML={{ __html: cssVariables }}
        />
        <style
          data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
          dangerouslySetInnerHTML={{
            __html: Object.values(cache.inserted).join(" "),
          }}
        />
      </>
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}

/**
 * 모든 Provider를 통합하는 컴포넌트
 * - QueryClientProvider: TanStack Query
 * - EmotionProvider: Emotion 스타일링
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <EmotionProvider>{children}</EmotionProvider>
      {/* 개발 모드에서만 React Query DevTools 표시 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
