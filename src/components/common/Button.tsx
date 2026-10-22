import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '@context';
import { triggerHaptic } from '@utils';
import { AppText } from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'festival';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = React.memo(({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  testID,
}) => {
  const theme = useAppTheme();

  const handlePress = () => {
    if (disabled || loading) return;
    triggerHaptic('light');
    onPress();
  };

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      minHeight: theme.minTouchTarget, // Accessible 44pt minimum
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...base,
          backgroundColor: theme.colors.primary,
          ...theme.shadows.subtle,
        };
      case 'festival':
        return {
          ...base,
          backgroundColor: theme.colors.accent,
          ...theme.shadows.card,
        };
      case 'secondary':
        return {
          ...base,
          backgroundColor: theme.colors.badgeBg,
        };
      case 'outline':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: theme.colors.primary,
        };
      case 'text':
        return {
          ...base,
          backgroundColor: 'transparent',
          paddingHorizontal: theme.spacing.xs,
        };
      default:
        return base;
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
        return theme.colors.surface;
      case 'festival':
        return theme.colors.textPrimary;
      case 'secondary':
        return theme.colors.badgeText;
      case 'outline':
      case 'text':
        return theme.colors.primary;
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      activeOpacity={0.75}
      onPress={handlePress}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colors.surface : theme.colors.primary}
        />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <AppText
            variant="labelLarge"
            weight="700"
            color={getTextColor()}
            style={[icon ? { marginLeft: theme.spacing.sm } : undefined, textStyle]}
          >
            {title}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
});
