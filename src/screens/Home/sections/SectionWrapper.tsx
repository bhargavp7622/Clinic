import React, { useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { SectionBackground } from '@types';
import { useAppTheme } from '@context';
import { AppText } from '@common';
import { useTranslation } from 'react-i18next';

interface SectionWrapperProps {
  id: string;
  title?: string;
  background: SectionBackground;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = React.memo(({
  id,
  title,
  background,
  children,
  style,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const renderBackground = () => {
    if (background.kind === 'gradient') {
      const colors = background.value.split(',').map(c => c.trim());
      const startColor = colors[0] || theme.colors.primary;
      const endColor = colors[1] || theme.colors.secondary;

      return (
        <View style={StyleSheet.absoluteFill}>
          <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={startColor} stopOpacity="1" />
                <Stop offset="100%" stopColor={endColor} stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill={`url(#grad-${id})`} />
          </Svg>
        </View>
      );
    }

    if (background.kind === 'image' && background.value) {
      return (
        <ImageBackground
          source={{ uri: background.value }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        >
          <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.overlay }]} />
        </ImageBackground>
      );
    }

    const bgColor = background.kind === 'color' ? background.value : theme.colors.surface;
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]} />;
  };

  const isGradient = background.kind === 'gradient';
  const displayTitle = title ? t(title, { defaultValue: title }) : '';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        style,
      ]}
    >
      {renderBackground()}

      {displayTitle ? (
        <View style={[styles.headerContainer, { paddingHorizontal: theme.spacing.md }]}>
          <AppText
            variant="titleLarge"
            weight="700"
            color={isGradient ? theme.colors.surface : theme.colors.textPrimary}
          >
            {displayTitle}
          </AppText>
        </View>
      ) : null}

      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 14,
  },
  headerContainer: {
    marginBottom: 10,
  },
  content: {
    width: '100%',
  },
});
