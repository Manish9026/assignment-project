'use client';

import { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useThemeStore } from '@/common/utils/themeStore';
import getTheme from '@/styles/theme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeStore();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
