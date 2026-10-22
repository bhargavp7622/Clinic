import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';
import { useAppTheme } from '@/context/ThemeContext';
import { ThemeTypography } from '@/types/theme.types';

export type TextVariant = keyof ThemeTypography;

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  colorKey?:
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'surface'
    | 'background'
    | 'accent'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'badgeText'
    | 'notification';
  color?: string;
  weight?: '400' | '500' | '600' | '700' | '800';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  style?: TextStyle | (TextStyle | undefined)[];
}

export const AppText: React.FC<AppTextProps> = React.memo(({
  variant = 'bodyMedium',
  colorKey = 'textPrimary',
  color,
  weight,
  align,
  children,
  style,
  ...rest
}) => {
  const theme = useAppTheme();
  const typo = theme.typography[variant];

  const resolvedColor = color || theme.colors[colorKey] || theme.colors.textPrimary;

  const textStyle: TextStyle = {
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
    fontWeight: weight || typo.fontWeight,
    letterSpacing: typo.letterSpacing,
    color: resolvedColor,
    textAlign: align,
  };

  return (
    <Text style={[textStyle, style as any]} {...rest}>
      {children}
    </Text>
  );
});
