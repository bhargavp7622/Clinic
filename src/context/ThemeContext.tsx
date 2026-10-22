import React, { createContext, useContext, useMemo } from 'react';
import { LayoutTheme } from '../types/config.types';
import { AppTheme } from '../types/theme.types';

const defaultLayoutTheme: LayoutTheme = {
  primary: '#0F766E',
  secondary: '#14B8A6',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  accent: '#0284C7',
};

export const createThemeFromConfig = (layoutTheme: LayoutTheme, isFestival: boolean = false): AppTheme => {
  return {
    colors: {
      ...layoutTheme,
      card: layoutTheme.surface,
      border: isFestival ? '#FED7AA' : '#E2E8F0',
      notification: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: layoutTheme.accent || '#0284C7',
      divider: isFestival ? '#FFEDD5' : '#F1F5F9',
      badgeBg: isFestival ? '#FFEDD5' : '#CCFBF1',
      badgeText: isFestival ? '#9A3412' : '#0F766E',
      overlay: 'rgba(15, 23, 42, 0.55)',
      shimmerBase: isFestival ? '#FEF3C7' : '#E2E8F0',
      shimmerHighlight: isFestival ? '#FFFBEB' : '#F8FAFC',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 40,
    },
    borderRadius: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      full: 9999,
    },
    typography: {
      displayLarge: { fontSize: 28, lineHeight: 34, fontWeight: '800' },
      headlineLarge: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
      headlineMedium: { fontSize: 18, lineHeight: 24, fontWeight: '700' },
      titleLarge: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
      titleMedium: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
      bodyLarge: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
      bodyMedium: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
      bodySmall: { fontSize: 11, lineHeight: 16, fontWeight: '400' },
      labelLarge: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
      labelSmall: { fontSize: 10, lineHeight: 14, fontWeight: '600', letterSpacing: 0.5 },
    },
    shadows: {
      none: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      subtle: {
        shadowColor: isFestival ? '#9A3412' : '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
      card: {
        shadowColor: isFestival ? '#7C2D12' : '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
      },
      floating: {
        shadowColor: isFestival ? '#7C2D12' : '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.14,
        shadowRadius: 12,
        elevation: 6,
      },
    },
    isFestival,
    minTouchTarget: 44, // Ensures accessible 44pt tap target minimum
  };
};

interface ThemeContextType {
  theme: AppTheme;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: createThemeFromConfig(defaultLayoutTheme),
});

interface ThemeProviderProps {
  layoutTheme?: LayoutTheme;
  isFestival?: boolean;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  layoutTheme = defaultLayoutTheme,
  isFestival = false,
  children,
}) => {
  const theme = useMemo(() => {
    return createThemeFromConfig(layoutTheme, isFestival);
  }, [layoutTheme, isFestival]);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = (): AppTheme => {
  const context = useContext(ThemeContext);
  return context.theme;
};
