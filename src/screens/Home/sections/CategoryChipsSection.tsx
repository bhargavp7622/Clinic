import React, { useState, useCallback } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { CategoryChipItem } from '@types';
import { useAppTheme } from '@context';
import { AppText } from '@common';
import { Icon } from '@components';
import { triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';

interface CategoryChipsSectionProps {
  items?: CategoryChipItem[];
  onSelectCategory?: (category: CategoryChipItem) => void;
}

export const CategoryChipsSection: React.FC<CategoryChipsSectionProps> = React.memo(({
  items,
  onSelectCategory,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const [selectedKey, setSelectedKey] = useState<string>('all');

  const handlePress = useCallback((item: CategoryChipItem) => {
    triggerHaptic('light');
    setSelectedKey(item.categoryKey);
    onSelectCategory?.(item);
  }, [onSelectCategory]);

  if (!items || items.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: theme.spacing.md },
      ]}
    >
      {items.map(item => {
        const isSelected = selectedKey === item.categoryKey;
        const translatedLabel = item.label ? t(item.label, { defaultValue: item.label }) : '';

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.surface,
                borderColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.border,
                borderRadius: theme.borderRadius.full,
                minHeight: theme.minTouchTarget,
                ...theme.shadows.subtle,
              },
            ]}
          >
            <View style={{ marginRight: 6 }}>
              <Icon
                name={item.icon}
                size={16}
                color={isSelected ? theme.colors.surface : theme.colors.primary}
              />
            </View>
            <AppText
              variant="labelLarge"
              weight={isSelected ? '700' : '500'}
              color={isSelected ? theme.colors.surface : theme.colors.textPrimary}
            >
              {translatedLabel}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
});

export default CategoryChipsSection;
