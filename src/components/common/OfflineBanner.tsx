import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNetwork } from '../../context/NetworkContext';
import { useConfig } from '../../context/ConfigContext';
import { useAppTheme } from '../../context/ThemeContext';
import { Icon } from '../icons/Icon';
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
        backgroundColor: '#FEF3C7',
        borderBottomWidth: 1,
        borderBottomColor: '#FDE68A',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
        <Icon name="alert-triangle" size={18} color="#D97706" />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: '#92400E',
            marginLeft: 8,
            flex: 1,
          }}
          numberOfLines={2}
        >
          {message}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => refreshConfig()}
          style={{
            backgroundColor: '#FDE68A',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            marginRight: 6,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#78350F' }}>
            {t('common.retry')}
          </Text>
        </TouchableOpacity>

        {onAdminPress ? (
          <TouchableOpacity onPress={onAdminPress} style={{ padding: 4 }}>
            <Icon name="sliders" size={16} color="#92400E" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
});
