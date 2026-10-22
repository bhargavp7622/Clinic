import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ServiceGridItem } from '@/types/config.types';
import { useAppTheme } from '@/context/ThemeContext';
import { formatCurrencyInr } from '@/utils/formatters';
import { AppText } from '@/components/common/AppText';
import { Icon } from '@/components/icons/Icon';
import { triggerHaptic } from '@/utils/haptics';
import { useTranslation } from 'react-i18next';

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
        <TouchableOpacity
          key={service.id}
          activeOpacity={0.85}
          onPress={() => {
            triggerHaptic('light');
            onServicePress?.(service);
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
          {/* Service Image with Zepto-style Badge */}
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

          {/* Details */}
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

            {/* Price & Add Row */}
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
                  styles.addBtn,
                  {
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.surface,
                  },
                ]}
              >
                <AppText variant="labelSmall" weight="800" colorKey="primary">
                  {t('common.book')}
                </AppText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
  },
  card: {
    flexBasis: '47.5%',
    flexGrow: 1,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 105,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationTag: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  details: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  addBtn: {
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
});
