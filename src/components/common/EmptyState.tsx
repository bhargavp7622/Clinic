import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import { Button } from './Button';
import { Icon, IconName } from '../icons/Icon';

interface EmptyStateProps {
  iconName?: IconName;
  title: string;
  description: string;
  actionTitle?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = React.memo(({
  iconName = 'clipboard',
  title,
  description,
  actionTitle,
  onActionPress,
  style,
}) => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.xl,
          marginVertical: theme.spacing.lg,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: theme.colors.divider,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.md,
        }}
      >
        <Icon name={iconName} size={36} color={theme.colors.textSecondary} />
      </View>

      <Text
        style={{
          fontSize: theme.typography.headlineMedium.fontSize,
          fontWeight: '700',
          color: theme.colors.textPrimary,
          textAlign: 'center',
          marginBottom: theme.spacing.xs,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: theme.typography.bodyMedium.fontSize,
          color: theme.colors.textSecondary,
          textAlign: 'center',
          lineHeight: 20,
          marginBottom: actionTitle ? theme.spacing.lg : 0,
          maxWidth: 280,
        }}
      >
        {description}
      </Text>

      {actionTitle && onActionPress ? (
        <Button title={actionTitle} onPress={onActionPress} variant="primary" />
      ) : null}
    </View>
  );
});
