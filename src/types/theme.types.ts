import { LayoutTheme } from './config.types';

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeBorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ThemeTypographyVariant {
  fontSize: number;
  lineHeight: number;
  fontWeight: '400' | '500' | '600' | '700' | '800';
  letterSpacing?: number;
}

export interface ThemeTypography {
  displayLarge: ThemeTypographyVariant;
  headlineLarge: ThemeTypographyVariant;
  headlineMedium: ThemeTypographyVariant;
  titleLarge: ThemeTypographyVariant;
  titleMedium: ThemeTypographyVariant;
  bodyLarge: ThemeTypographyVariant;
  bodyMedium: ThemeTypographyVariant;
  bodySmall: ThemeTypographyVariant;
  labelLarge: ThemeTypographyVariant;
  labelSmall: ThemeTypographyVariant;
}

export interface ThemeShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface AppTheme {
  colors: LayoutTheme & {
    card: string;
    border: string;
    notification: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    divider: string;
    badgeBg: string;
    badgeText: string;
    overlay: string;
    shimmerHighlight: string;
    shimmerBase: string;
  };
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
  shadows: {
    none: ThemeShadow;
    subtle: ThemeShadow;
    card: ThemeShadow;
    floating: ThemeShadow;
  };
  isFestival: boolean;
  minTouchTarget: number;
}
