import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNetwork, useConfig, useAppTheme } from '@context';
import { AppText } from './AppText';
import { Icon } from '@components';
import { useTranslation } from 'react-i18next';

interface OfflineBannerProps {
  onAdminPress?: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = React.memo(({ onAdminPress }) => {
  const { isEffectiveOffline, isSimulatedFailure } = useNetwork();
  const { fromCache, refreshConfig } = useConfig();
  const theme = useAppTheme();
  const { t } = useTranslation();

  if (!isEffectiveOffline && !fromCache) {
    return null;
  }

  const message = isSimulatedFailure
    ? t('common.simulated_failure')
    : t('common.offline_notice');

  return (
    <View
      style={{
        backgroundColor: theme.colors.badgeBg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
        <Icon name="alert-triangle" size={18} color={theme.colors.warning} />
        <AppText
          variant="bodySmall"
          weight="600"
          colorKey="textPrimary"
          numberOfLines={2}
          style={{ marginLeft: 8, flex: 1 }}
        >
          {message}
        </AppText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => refreshConfig()}
          style={{
            backgroundColor: theme.colors.surface,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            marginRight: 6,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <AppText variant="labelSmall" weight="700" colorKey="primary">
            {t('common.retry')}
          </AppText>
        </TouchableOpacity>

        {onAdminPress ? (
          <TouchableOpacity onPress={onAdminPress} style={{ padding: 4 }}>
            <Icon name="sliders" size={16} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
});
