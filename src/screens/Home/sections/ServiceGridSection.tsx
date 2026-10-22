import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ServiceGridItem } from '../../../types/config.types';
import { useAppTheme } from '../../../context/ThemeContext';
import { formatCurrencyInr } from '../../../utils/formatters';
import { Icon } from '../../../components/icons/Icon';
import { triggerHaptic } from '../../../utils/haptics';

interface ServiceGridSectionProps {
  items?: ServiceGridItem[];
  onServicePress?: (service: ServiceGridItem) => void;
}

export const ServiceGridSection: React.FC<ServiceGridSectionProps> = React.memo(({
  items,
  onServicePress,
}) => {
  const theme = useAppTheme();

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
          <View style={styles.imageContainer}>
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
                    backgroundColor: theme.isFestival ? '#EA580C' : '#0F766E',
                  },
                ]}
              >
                <Text style={styles.badgeText}>{service.badge}</Text>
              </View>
            ) : null}

            {service.duration ? (
              <View style={styles.durationTag}>
                <Icon name="clock" size={10} color="#FFFFFF" />
                <Text style={styles.durationText}>{service.duration}</Text>
              </View>
            ) : null}
          </View>

          {/* Details */}
          <View style={styles.details}>
            <Text
              style={[
                styles.serviceName,
                {
                  color: theme.colors.textPrimary,
                  fontSize: theme.typography.titleMedium.fontSize,
                },
              ]}
              numberOfLines={2}
            >
              {service.name}
            </Text>

            {service.testsCount ? (
              <Text style={[styles.testsCount, { color: theme.colors.textSecondary }]}>
                Includes {service.testsCount} key tests
              </Text>
            ) : null}

            {/* Price & Add Row */}
            <View style={styles.priceRow}>
              <View>
                <Text
                  style={[
                    styles.price,
                    {
                      color: theme.colors.textPrimary,
                      fontSize: theme.typography.titleLarge.fontSize,
                    },
                  ]}
                >
                  {formatCurrencyInr(service.priceInr)}
                </Text>
                {service.originalPriceInr ? (
                  <Text style={[styles.originalPrice, { color: theme.colors.textSecondary }]}>
                    {formatCurrencyInr(service.originalPriceInr)}
                  </Text>
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
                <Text style={[styles.addBtnText, { color: theme.colors.primary }]}>
                  BOOK
                </Text>
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
    backgroundColor: '#F1F5F9',
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
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  durationTag: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  details: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  serviceName: {
    fontWeight: '700',
    minHeight: 36,
  },
  testsCount: {
    fontSize: 11,
    marginTop: 2,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontWeight: '800',
  },
  originalPrice: {
    fontSize: 10,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
