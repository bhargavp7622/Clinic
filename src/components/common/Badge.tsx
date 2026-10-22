import React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '@/context/ThemeContext';
import { AppText } from './AppText';

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
        return { bg: theme.colors.badgeBg, text: theme.colors.success };
      case 'warning':
        return { bg: theme.colors.badgeBg, text: theme.colors.warning };
      case 'error':
        return { bg: theme.colors.divider, text: theme.colors.error };
      case 'festival':
        return { bg: theme.colors.badgeBg, text: theme.colors.primary };
      case 'info':
        return { bg: theme.colors.badgeBg, text: theme.colors.info };
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
      <AppText
        variant="labelSmall"
        weight="700"
        color={text}
        style={textStyle}
      >
        {label}
      </AppText>
    </View>
  );
});
