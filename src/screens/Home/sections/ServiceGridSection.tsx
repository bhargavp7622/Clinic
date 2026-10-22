import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ServiceGridItem } from '@types';
import { useAppTheme } from '@context';
import { AppText } from '@common';
import { Icon } from '@components';
import { formatCurrencyInr, triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';

interface ServiceCardItemProps {
  service: ServiceGridItem;
  theme: any;
  t: (key: string) => string;
  onPress?: (service: ServiceGridItem) => void;
}

const ServiceCardItem: React.FC<ServiceCardItemProps> = React.memo(({
  service,
  theme,
  t,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        triggerHaptic('light');
        onPress?.(service);
      }}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadows.subtle,
        },
      ]}
    >
      <View style={[styles.imageContainer, { backgroundColor: theme.colors.divider }]}>
        <Image
          source={{ uri: service.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {service.badge ? (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}
          >
            <AppText variant="labelSmall" weight="800" color={theme.colors.surface}>
              {service.badge}
            </AppText>
          </View>
        ) : null}

        {service.duration ? (
          <View style={[styles.durationTag, { backgroundColor: theme.colors.overlay }]}>
            <Icon name="clock" size={10} color={theme.colors.surface} />
            <AppText variant="labelSmall" weight="600" color={theme.colors.surface}>
              {service.duration}
            </AppText>
          </View>
        ) : null}
      </View>

      <View style={styles.details}>
        <AppText
          variant="titleMedium"
          weight="700"
          numberOfLines={2}
          style={{ minHeight: 36 }}
        >
          {service.name}
        </AppText>

        {service.testsCount ? (
          <AppText
            variant="bodySmall"
            colorKey="textSecondary"
            style={{ marginTop: 2, marginBottom: 8 }}
          >
            Includes {service.testsCount} key tests
          </AppText>
        ) : null}

        <View style={styles.priceRow}>
          <View>
            <AppText variant="titleLarge" weight="800">
              {formatCurrencyInr(service.priceInr)}
            </AppText>
            {service.originalPriceInr ? (
              <AppText
                variant="labelSmall"
                colorKey="textSecondary"
                style={{ textDecorationLine: 'line-through' }}
              >
                {formatCurrencyInr(service.originalPriceInr)}
              </AppText>
            ) : null}
          </View>

          <View
            style={[
              styles.addButton,
              {
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.badgeBg,
              },
            ]}
          >
            <AppText variant="labelLarge" weight="800" colorKey="primary">
              {t('common.add')}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

interface ServiceGridSectionProps {
  items?: ServiceGridItem[];
  onServicePress?: (service: ServiceGridItem) => void;
}

export const ServiceGridSection: React.FC<ServiceGridSectionProps> = React.memo(({
  items,
  onServicePress,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  return (
    <View style={[styles.grid, { paddingHorizontal: theme.spacing.md }]}>
      {items.map(service => (
        <ServiceCardItem
          key={service.id}
          service={service}
          theme={theme}
          t={t}
          onPress={onServicePress}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 110,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  durationTag: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  details: {
    padding: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1.5,
  },
});

export default ServiceGridSection;
