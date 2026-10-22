import { LayoutTheme } from '@/types/config.types';
import { AppTheme } from '@/types/theme.types';
import { THEME_COLORS, PALETTE, STANDARD_THEME_COLORS, FESTIVAL_THEME_COLORS } from './colors';
import { SPACING, BORDER_RADIUS, MIN_TOUCH_TARGET } from './spacing';
import { TYPOGRAPHY } from './typography';

export { THEME_COLORS, PALETTE, SPACING, BORDER_RADIUS, TYPOGRAPHY, MIN_TOUCH_TARGET };

export const buildAppTheme = (layoutTheme?: Partial<LayoutTheme>, isFestival: boolean = false): AppTheme => {
  const baseColors = isFestival ? FESTIVAL_THEME_COLORS : STANDARD_THEME_COLORS;

  const mergedColors = {
    ...baseColors,
    ...(layoutTheme || {}),
    card: layoutTheme?.surface || baseColors.surface,
    border: isFestival ? PALETTE.saffron200 : PALETTE.slate200,
    notification: PALETTE.red500,
    success: PALETTE.green600,
    warning: PALETTE.amber500,
    error: PALETTE.red500,
    info: layoutTheme?.accent || baseColors.accent,
    divider: isFestival ? PALETTE.saffron100 : PALETTE.slate100,
    badgeBg: isFestival ? PALETTE.saffron100 : PALETTE.teal100,
    badgeText: isFestival ? PALETTE.saffron800 : PALETTE.teal700,
    overlay: PALETTE.overlayDark,
    shimmerBase: isFestival ? PALETTE.gold100 : PALETTE.slate200,
    shimmerHighlight: isFestival ? PALETTE.gold50 : PALETTE.slate50,
  };

  return {
    colors: mergedColors,
    spacing: SPACING,
    borderRadius: BORDER_RADIUS,
    typography: TYPOGRAPHY,
    shadows: {
      none: {
        shadowColor: PALETTE.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      subtle: {
        shadowColor: isFestival ? PALETTE.saffron800 : PALETTE.slate900,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
      card: {
        shadowColor: isFestival ? PALETTE.saffron900 : PALETTE.slate900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
      },
      floating: {
        shadowColor: isFestival ? PALETTE.saffron900 : PALETTE.slate900,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.14,
        shadowRadius: 12,
        elevation: 6,
      },
    },
    isFestival,
    minTouchTarget: MIN_TOUCH_TARGET,
  };
};
