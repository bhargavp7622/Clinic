import React, { createContext, useContext, useMemo } from 'react';
import { LayoutTheme, AppTheme } from '@types';
import { buildAppTheme } from '@theme';

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
