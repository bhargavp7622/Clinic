import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useAppTheme } from '@context';
import { Button } from './Button';
import { AppText } from './AppText';
import { Icon, IconName } from '@components';

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

      <AppText
        variant="headlineMedium"
        weight="700"
        align="center"
        colorKey="textPrimary"
        style={{ marginBottom: theme.spacing.xs }}
      >
        {title}
      </AppText>

      <AppText
        variant="bodyMedium"
        align="center"
        colorKey="textSecondary"
        style={{
          lineHeight: 20,
          marginBottom: actionTitle ? theme.spacing.lg : 0,
          maxWidth: 280,
        }}
      >
        {description}
      </AppText>

      {actionTitle && onActionPress ? (
        <Button title={actionTitle} onPress={onActionPress} variant="primary" />
      ) : null}
    </View>
  );
});
