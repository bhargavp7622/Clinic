import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import { Icon } from '../icons/Icon';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  placeholder?: string;
  onSearchChange: (query: string) => void;
  style?: ViewStyle;
  initialValue?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(({
  placeholder = 'Search...',
  onSearchChange,
  style,
  initialValue = '',
  debounceMs = 350,
}) => {
  const theme = useAppTheme();
  const [text, setText] = useState(initialValue);
  const debouncedQuery = useDebounce(text, debounceMs);

  useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, onSearchChange]);

  const handleClear = () => {
    setText('');
    onSearchChange('');
  };

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.full,
          borderWidth: 1,
          borderColor: theme.colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.md,
          minHeight: theme.minTouchTarget, // ensures 44pt tap target
          ...theme.shadows.subtle,
        },
        style,
      ]}
    >
      <Icon name="search" size={18} color={theme.colors.textSecondary} />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        style={{
          flex: 1,
          marginLeft: theme.spacing.sm,
          fontSize: theme.typography.bodyMedium.fontSize,
          color: theme.colors.textPrimary,
          paddingVertical: 8,
        }}
        accessibilityLabel={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {text.length > 0 ? (
        <TouchableOpacity
          onPress={handleClear}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ padding: 4 }}
        >
          <Icon name="close" size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});
