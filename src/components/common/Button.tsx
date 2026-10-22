import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import { triggerHaptic } from '../../utils/haptics';

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
      minHeight: theme.minTouchTarget, // Ensures 44pt tap target minimum
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

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'primary':
        return {
          color: '#FFFFFF',
          fontSize: theme.typography.labelLarge.fontSize,
          fontWeight: '700',
        };
      case 'festival':
        return {
          color: '#451A03',
          fontSize: theme.typography.labelLarge.fontSize,
          fontWeight: '700',
        };
      case 'secondary':
        return {
          color: theme.colors.badgeText,
          fontSize: theme.typography.labelLarge.fontSize,
          fontWeight: '600',
        };
      case 'outline':
        return {
          color: theme.colors.primary,
          fontSize: theme.typography.labelLarge.fontSize,
          fontWeight: '600',
        };
      case 'text':
        return {
          color: theme.colors.primary,
          fontSize: theme.typography.labelLarge.fontSize,
          fontWeight: '600',
        };
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
          color={variant === 'primary' ? '#FFFFFF' : theme.colors.primary}
        />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <Text
            style={[
              getTextStyle(),
              icon ? { marginLeft: theme.spacing.sm } : null,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
});
