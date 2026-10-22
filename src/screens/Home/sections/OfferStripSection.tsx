import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { OfferStripItem } from '@types';
import { useAppTheme } from '@context';
import { AppText } from '@common';
import { Icon } from '@components';
import { triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';

interface OfferStripSectionProps {
  items?: OfferStripItem[];
  onActionPress?: () => void;
}

export const OfferStripSection: React.FC<OfferStripSectionProps> = React.memo(({
  items,
  onActionPress,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const offer = items?.[0];

  if (!offer) return null;

  const handlePress = () => {
    triggerHaptic('light');
    onActionPress?.();
  };

  const offerText = offer.text ? t(offer.text, { defaultValue: offer.text }) : '';

  return (
    <View style={[styles.container, { paddingHorizontal: theme.spacing.md }]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePress}
        style={[
          styles.banner,
          {
            backgroundColor: theme.colors.badgeBg,
            borderColor: theme.colors.border,
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
            color={theme.colors.primary}
          />
        </View>

        <AppText
          variant="bodySmall"
          weight="600"
          colorKey="textPrimary"
          numberOfLines={2}
          style={{ flex: 1, lineHeight: 16 }}
        >
          {offerText}
        </AppText>

        {offer.couponCode ? (
          <View
            style={[
              styles.couponBadge,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}
          >
            <AppText variant="labelSmall" weight="800" color={theme.colors.surface}>
              {offer.couponCode}
            </AppText>
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
  couponBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },
});
