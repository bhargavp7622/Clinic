import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { HeroBannerItem } from '@types';
import { useAppTheme } from '@context';
import { Button, AppText } from '@common';
import { Icon } from '@components';
import { useTranslation } from 'react-i18next';

interface HeroBannerSectionProps {
  items?: HeroBannerItem[];
  scrollY?: Animated.Value;
  onCtaPress?: (action?: string) => void;
}

export const HeroBannerSection: React.FC<HeroBannerSectionProps> = React.memo(({
  items,
  scrollY,
  onCtaPress,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const banner = items?.[0];

  if (!banner) return null;

  const parallaxTranslate = scrollY
    ? scrollY.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: [50, 0, -25],
        extrapolate: 'clamp',
      })
    : 0;

  const greetingText = banner.greeting ? t(banner.greeting, { defaultValue: banner.greeting }) : t('home.greeting_patient');
  const titleText = banner.title ? t(banner.title, { defaultValue: banner.title }) : '';
  const subtitleText = banner.subtitle ? t(banner.subtitle, { defaultValue: banner.subtitle }) : '';
  const ctaText = banner.ctaText ? t(banner.ctaText, { defaultValue: banner.ctaText }) : t('home.hero_cta');

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing.md,
          transform: [{ translateY: parallaxTranslate }],
        },
      ]}
    >
      <View
        style={[
          styles.bannerCard,
          {
            borderRadius: theme.borderRadius.xl,
            backgroundColor: theme.colors.badgeBg,
            borderColor: theme.colors.border,
            padding: theme.spacing.lg,
            borderWidth: 1,
            ...theme.shadows.card,
          },
        ]}
      >
        {/* Top Tag */}
        <View style={styles.tagContainer}>
          <View style={[styles.tagBadge, { backgroundColor: theme.colors.surface }]}>
            <Icon name="sparkles" size={14} color={theme.colors.accent} />
            <AppText variant="labelSmall" weight="700" colorKey="primary">
              {greetingText}
            </AppText>
          </View>
        </View>

        {/* Title */}
        <AppText
          variant="headlineLarge"
          weight="800"
          colorKey="textPrimary"
          style={{ marginBottom: 6 }}
        >
          {titleText}
        </AppText>

        {/* Subtitle */}
        {subtitleText ? (
          <AppText
            variant="bodyMedium"
            colorKey="textSecondary"
            style={{ marginBottom: 16 }}
          >
            {subtitleText}
          </AppText>
        ) : null}

        {/* Action Button */}
        {ctaText ? (
          <View style={styles.buttonWrapper}>
            <Button
              title={ctaText}
              onPress={() => onCtaPress?.(banner.ctaAction)}
              variant="primary"
              icon={<Icon name="calendar-plus" size={16} color={theme.colors.surface} />}
            />
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 4,
  },
  bannerCard: {},
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    gap: 6,
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
  },
});
