import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { CategoryChipItem } from '../../../types/config.types';
import { useAppTheme } from '../../../context/ThemeContext';
import { Icon } from '../../../components/icons/Icon';
import { triggerHaptic } from '../../../utils/haptics';

interface CategoryChipsSectionProps {
  items?: CategoryChipItem[];
  onSelectCategory?: (category: CategoryChipItem) => void;
}

export const CategoryChipsSection: React.FC<CategoryChipsSectionProps> = React.memo(({
  items,
  onSelectCategory,
}) => {
  const theme = useAppTheme();
  const [selectedKey, setSelectedKey] = useState<string>('all');

  if (!items || items.length === 0) return null;

  const handlePress = (item: CategoryChipItem) => {
    triggerHaptic('light');
    setSelectedKey(item.categoryKey);
    onSelectCategory?.(item);
  };

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
                minHeight: theme.minTouchTarget, // ensures accessible 44pt tap target
                ...theme.shadows.subtle,
              },
            ]}
          >
            <View style={{ marginRight: 6 }}>
              <Icon
                name={item.icon}
                size={16}
                color={isSelected ? '#FFFFFF' : theme.colors.primary}
              />
            </View>
            <Text
              style={[
                styles.chipText,
                {
                  color: isSelected ? '#FFFFFF' : theme.colors.textPrimary,
                  fontSize: theme.typography.labelLarge.fontSize,
                  fontWeight: isSelected ? '700' : '500',
                },
              ]}
            >
              {item.label}
            </Text>
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
  chipText: {
    letterSpacing: 0.1,
  },
});
