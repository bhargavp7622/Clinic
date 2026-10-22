import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { QuickActionItem } from '@types';
import { useAppTheme } from '@context';
import { AppText } from '@common';
import { Icon } from '@components';
import { triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';

interface QuickActionsSectionProps {
  items?: QuickActionItem[];
  onActionPress?: (action: string) => void;
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = React.memo(({
  items,
  onActionPress,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  return (
    <View style={[styles.grid, { paddingHorizontal: theme.spacing.md }]}>
      {items.map(item => {
        const translatedLabel = item.label ? t(item.label, { defaultValue: item.label }) : '';
        const translatedSublabel = item.sublabel ? t(item.sublabel, { defaultValue: item.sublabel }) : '';
        const translatedBadge = item.badge ? t(item.badge, { defaultValue: item.badge }) : '';

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => {
              triggerHaptic('light');
              onActionPress?.(item.action);
            }}
            style={[
              styles.tile,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                borderColor: theme.colors.border,
                padding: theme.spacing.md,
                ...theme.shadows.subtle,
              },
            ]}
          >
            {translatedBadge ? (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: theme.colors.badgeBg,
                  },
                ]}
              >
                <AppText variant="labelSmall" weight="800" colorKey="badgeText">
                  {translatedBadge}
                </AppText>
              </View>
            ) : null}

            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: theme.colors.badgeBg,
                },
              ]}
            >
              <Icon
                name={item.icon}
                size={22}
                color={theme.colors.primary}
              />
            </View>

            <AppText
              variant="titleMedium"
              weight="700"
              colorKey="textPrimary"
              style={{ marginBottom: 2 }}
            >
              {translatedLabel}
            </AppText>

            {translatedSublabel ? (
              <AppText variant="bodySmall" colorKey="textSecondary">
                {translatedSublabel}
              </AppText>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  tile: {
    flexBasis: '47.5%',
    flexGrow: 1,
    borderWidth: 1,
    position: 'relative',
    alignItems: 'flex-start',
    minHeight: 90,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
