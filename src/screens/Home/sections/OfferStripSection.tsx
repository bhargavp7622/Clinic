import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { OfferStripItem } from '../../../types/config.types';
import { useAppTheme } from '../../../context/ThemeContext';
import { Icon } from '../../../components/icons/Icon';
import { triggerHaptic } from '../../../utils/haptics';

interface OfferStripSectionProps {
  items?: OfferStripItem[];
  onActionPress?: () => void;
}

export const OfferStripSection: React.FC<OfferStripSectionProps> = React.memo(({
  items,
  onActionPress,
}) => {
  const theme = useAppTheme();
  const offer = items?.[0];

  if (!offer) return null;

  const handlePress = () => {
    triggerHaptic('light');
    onActionPress?.();
  };

  return (
    <View style={[styles.container, { paddingHorizontal: theme.spacing.md }]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePress}
        style={[
          styles.banner,
          {
            backgroundColor: theme.isFestival ? '#FEF3C7' : '#ECFDF5',
            borderColor: theme.isFestival ? '#FDE68A' : '#A7F3D0',
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.sm,
            minHeight: theme.minTouchTarget,
          },
        ]}
      >
        <View style={styles.iconCol}>
          <Icon
            name="gift"
            size={18}
            color={theme.isFestival ? '#C2410C' : '#0F766E'}
          />
        </View>

        <Text
          style={[
            styles.text,
            {
              color: theme.isFestival ? '#78350F' : '#065F46',
              fontSize: theme.typography.bodySmall.fontSize,
            },
          ]}
          numberOfLines={2}
        >
          {offer.text}
        </Text>

        {offer.couponCode ? (
          <View
            style={[
              styles.couponBadge,
              {
                backgroundColor: theme.isFestival ? '#EA580C' : '#0F766E',
              },
            ]}
          >
            <Text style={styles.couponText}>{offer.couponCode}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 2,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconCol: {
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontWeight: '600',
    lineHeight: 16,
  },
  couponBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },
  couponText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
