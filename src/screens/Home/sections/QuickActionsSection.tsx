import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { QuickActionItem } from '../../../types/config.types';
import { useAppTheme } from '../../../context/ThemeContext';
import { Icon } from '../../../components/icons/Icon';
import { triggerHaptic } from '../../../utils/haptics';

interface QuickActionsSectionProps {
  items?: QuickActionItem[];
  onActionPress?: (action: string) => void;
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = React.memo(({
  items,
  onActionPress,
}) => {
  const theme = useAppTheme();

  if (!items || items.length === 0) return null;

  return (
    <View style={[styles.grid, { paddingHorizontal: theme.spacing.md }]}>
      {items.map(item => (
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
          {item.badge ? (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: theme.colors.badgeBg,
                },
              ]}
            >
              <Text style={[styles.badgeText, { color: theme.colors.badgeText }]}>
                {item.badge}
              </Text>
            </View>
          ) : null}

          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: theme.isFestival ? '#FFEDD5' : '#E0F2FE',
              },
            ]}
          >
            <Icon
              name={item.icon}
              size={22}
              color={theme.isFestival ? '#C2410C' : theme.colors.primary}
            />
          </View>

          <Text
            style={[
              styles.label,
              {
                color: theme.colors.textPrimary,
                fontSize: theme.typography.titleMedium.fontSize,
              },
            ]}
          >
            {item.label}
          </Text>

          {item.sublabel ? (
            <Text
              style={[
                styles.sublabel,
                {
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.bodySmall.fontSize,
                },
              ]}
            >
              {item.sublabel}
            </Text>
          ) : null}
        </TouchableOpacity>
      ))}
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
  label: {
    fontWeight: '700',
    marginBottom: 2,
  },
  sublabel: {
    fontWeight: '400',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
});
