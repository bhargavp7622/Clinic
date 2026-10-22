import React, { createContext, useContext, useMemo } from 'react';
import { LayoutTheme } from '@/types/config.types';
import { AppTheme } from '@/types/theme.types';
import { buildAppTheme } from '@/common/theme';

interface ThemeContextType {
  theme: AppTheme;
}

const defaultTheme = buildAppTheme();

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
});

interface ThemeProviderProps {
  layoutTheme?: LayoutTheme;
  isFestival?: boolean;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  layoutTheme,
  isFestival = false,
  children,
}) => {
  const theme = useMemo(() => {
    return buildAppTheme(layoutTheme, isFestival);
  }, [layoutTheme, isFestival]);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = (): AppTheme => {
  const context = useContext(ThemeContext);
  return context.theme;
};
