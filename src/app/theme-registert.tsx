"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import {  CssBaseline } from "@mui/material";
import createEmotionCache from "./create-emotion-cache.ts";
import ThemeProvider from "@/common/components/ThemeProvider";
// import theme from "./theme"; // optional custom theme

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const cache = React.useMemo(() => createEmotionCache(), []);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
