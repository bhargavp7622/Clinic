import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/context/ThemeContext';
import { AppText } from './AppText';
import { Icon } from '@/components/icons/Icon';
import { triggerHaptic } from '@/utils/haptics';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = React.memo(({
  title,
  showBack = true,
  onBackPress,
  rightAction,
  style,
}) => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();

  const handleBack = () => {
    triggerHaptic('light');
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing.md,
          paddingVertical: 12,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          minHeight: 52,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {showBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{ marginRight: 12, padding: 4 }}
            accessibilityLabel="Go back"
          >
            <Icon name="chevron-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        ) : null}

        <AppText variant="headlineMedium" weight="800" numberOfLines={1} style={{ flex: 1 }}>
          {title}
        </AppText>
      </View>

      {rightAction ? <View>{rightAction}</View> : <View style={{ width: showBack ? 24 : 0 }} />}
    </View>
  );
});
