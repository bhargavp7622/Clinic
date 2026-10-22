import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  bordered?: boolean;
  elevated?: boolean;
  testID?: string;
}

export const Card: React.FC<CardProps> = React.memo(({
  children,
  style,
  onPress,
  bordered = true,
  elevated = true,
  testID,
}) => {
  const theme = useAppTheme();

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...(bordered ? { borderWidth: 1, borderColor: theme.colors.border } : {}),
    ...(elevated ? theme.shadows.subtle : {}),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[containerStyle, style]}
        testID={testID}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {children}
    </View>
  );
});
