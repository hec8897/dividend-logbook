"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { theme, themeToCSSVariables } from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";

export default function EmotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
