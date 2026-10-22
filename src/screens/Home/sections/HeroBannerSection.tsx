import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { HeroBannerItem } from '../../../types/config.types';
import { useAppTheme } from '../../../context/ThemeContext';
import { Button } from '../../../components/common/Button';
import { Icon } from '../../../components/icons/Icon';

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
  const banner = items?.[0];

  if (!banner) return null;

  // Parallax transform on scroll
  const parallaxTranslate = scrollY
    ? scrollY.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: [50, 0, -25],
        extrapolate: 'clamp',
      })
    : 0;

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
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            padding: theme.spacing.lg,
          },
        ]}
      >
        {/* Top Tag */}
        <View style={styles.tagContainer}>
          <View style={styles.tagBadge}>
            <Icon name="sparkles" size={14} color="#FDE047" />
            <Text style={styles.tagText}>
              {banner.greeting || 'Namaste! Welcome to Tapza Care'}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{banner.title}</Text>

        {/* Subtitle */}
        {banner.subtitle ? (
          <Text style={styles.subtitle}>{banner.subtitle}</Text>
        ) : null}

        {/* Action Button */}
        {banner.ctaText ? (
          <View style={styles.buttonWrapper}>
            <Button
              title={banner.ctaText}
              onPress={() => onCtaPress?.(banner.ctaAction)}
              variant={theme.isFestival ? 'festival' : 'primary'}
              style={{
                backgroundColor: theme.isFestival ? '#FDE047' : '#FFFFFF',
              }}
              textStyle={{
                color: theme.isFestival ? '#78350F' : theme.colors.primary,
                fontWeight: '800',
              }}
              icon={
                <Icon
                  name="calendar-plus"
                  size={16}
                  color={theme.isFestival ? '#78350F' : theme.colors.primary}
                />
              }
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
  bannerCard: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    gap: 6,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 28,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
    marginBottom: 16,
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
  },
});
