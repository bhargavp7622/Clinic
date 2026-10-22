import { LayoutTheme } from './config.types';

export interface ThemeSpacing {
  xs: number;  // 4
  sm: number;  // 8
  md: number;  // 16
  lg: number;  // 24
  xl: number;  // 32
  xxl: number; // 40
}

export interface ThemeBorderRadius {
  xs: number;  // 4
  sm: number;  // 8
  md: number;  // 12
  lg: number;  // 16
  xl: number;  // 24
  full: number;// 9999
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
  minTouchTarget: number; // 44
}
