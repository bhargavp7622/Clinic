import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'primary' | 'festival';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = React.memo(({
  label,
  variant = 'primary',
  style,
  textStyle,
  icon,
}) => {
  const theme = useAppTheme();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: '#DCFCE7', text: '#15803D' };
      case 'warning':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'error':
        return { bg: '#FEE2E2', text: '#B91C1C' };
      case 'festival':
        return { bg: '#FFEDD5', text: '#C2410C' };
      case 'info':
        return { bg: '#E0F2FE', text: '#0369A1' };
      case 'primary':
      default:
        return { bg: theme.colors.badgeBg, text: theme.colors.badgeText };
    }
  };

  const { bg, text } = getColors();

  return (
    <View
      style={[
        {
          backgroundColor: bg,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: 3,
          borderRadius: theme.borderRadius.full,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      {icon ? <View style={{ marginRight: 4 }}>{icon}</View> : null}
      <Text
        style={[
          {
            color: text,
            fontSize: theme.typography.labelSmall.fontSize,
            fontWeight: '700',
            letterSpacing: 0.3,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
});
