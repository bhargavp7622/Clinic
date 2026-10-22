import React, { useEffect, useRef } from 'react';
import { View, Animated, ViewStyle } from 'react-native';
import { useAppTheme } from '@context';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = React.memo(({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const theme = useAppTheme();
  const animatedValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.85,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: theme.colors.shimmerBase,
          opacity: animatedValue,
        },
        style,
      ]}
    />
  );
});

export const HeroBannerSkeleton: React.FC = React.memo(() => {
  const theme = useAppTheme();
  return (
    <View style={{ padding: theme.spacing.md }}>
      <Skeleton height={140} borderRadius={theme.borderRadius.xl} />
    </View>
  );
});

export const CategoryChipsSkeleton: React.FC = React.memo(() => {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: theme.spacing.md, gap: theme.spacing.sm, marginVertical: theme.spacing.sm }}>
      <Skeleton width={110} height={38} borderRadius={theme.borderRadius.full} />
      <Skeleton width={95} height={38} borderRadius={theme.borderRadius.full} />
      <Skeleton width={120} height={38} borderRadius={theme.borderRadius.full} />
      <Skeleton width={100} height={38} borderRadius={theme.borderRadius.full} />
    </View>
  );
});

export const DoctorCardSkeleton: React.FC = React.memo(() => {
  const theme = useAppTheme();
  return (
    <View
      style={{
        width: 250,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginRight: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
        <Skeleton width={52} height={52} borderRadius={26} />
        <View style={{ marginLeft: theme.spacing.sm, flex: 1, gap: 6 }}>
          <Skeleton width="80%" height={14} />
          <Skeleton width="50%" height={12} />
        </View>
      </View>
      <Skeleton width="100%" height={28} borderRadius={theme.borderRadius.sm} style={{ marginTop: theme.spacing.sm }} />
    </View>
  );
});

export const ServiceCardSkeleton: React.FC = React.memo(() => {
  const theme = useAppTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        margin: theme.spacing.xs,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
    >
      <Skeleton height={90} borderRadius={theme.borderRadius.sm} />
      <Skeleton width="75%" height={14} style={{ marginTop: theme.spacing.sm }} />
      <Skeleton width="45%" height={12} style={{ marginTop: 4 }} />
    </View>
  );
});
