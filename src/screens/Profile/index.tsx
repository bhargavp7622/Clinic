import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../context/ThemeContext';
import { useConfig } from '../../context/ConfigContext';
import { Icon } from '../../components/icons/Icon';
import { changeLanguage } from '../../i18n';
import { useTranslation } from 'react-i18next';
import { triggerHaptic } from '../../utils/haptics';

export const ProfileScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const { config, activeMode } = useConfig();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: 'en' | 'hi' | 'te') => {
    triggerHaptic('light');
    changeLanguage(lang);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingVertical: 12,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '800', color: theme.colors.textPrimary }}>
          Patient Profile & Family
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: theme.spacing.md, gap: 16 }}>
        {/* Patient Card */}
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: theme.colors.border,
            padding: theme.spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            ...theme.shadows.subtle,
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: theme.colors.badgeBg,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
            }}
          >
            <Icon name="user" size={26} color={theme.colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: theme.colors.textPrimary }}>
              Bhargav Parmar
            </Text>
            <Text style={{ fontSize: 13, color: theme.colors.textSecondary, marginTop: 2 }}>
              +91 98765 43210 • Banjara Hills, Hyderabad
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                marginTop: 6,
                backgroundColor: '#DCFCE7',
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 4,
                alignSelf: 'flex-start',
              }}
            >
              <Icon name="check-circle" size={11} color="#15803D" />
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#15803D' }}>
                WhatsApp Rx Verified
              </Text>
            </View>
          </View>
        </View>

        {/* Multi-language Selector (English, Hindi, Telugu) */}
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: theme.colors.border,
            padding: theme.spacing.md,
            ...theme.shadows.subtle,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: theme.colors.textPrimary, marginBottom: 4 }}>
            App Language (భాష / भाषा)
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginBottom: 12 }}>
            Specially adapted for elder patients and regional families
          </Text>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी (Hindi)' },
              { code: 'te', label: 'తెలుగు (Telugu)' },
            ].map(item => {
              const isActive = i18n.language === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  activeOpacity={0.8}
                  onPress={() => handleLanguageChange(item.code as any)}
                  style={{
                    flex: 1,
                    minHeight: theme.minTouchTarget,
                    backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
                    borderColor: isActive ? theme.colors.primary : theme.colors.border,
                    borderWidth: 1.5,
                    borderRadius: theme.borderRadius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: isActive ? '#FFFFFF' : theme.colors.textPrimary,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Active Theme & Admin Control Entry */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            triggerHaptic('light');
            navigation.navigate('AdminConfig');
          }}
          style={{
            backgroundColor: theme.isFestival ? '#FFFBEB' : theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: theme.isFestival ? '#FDE68A' : theme.colors.border,
            padding: theme.spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...theme.shadows.subtle,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: theme.isFestival ? '#FED7AA' : theme.colors.divider,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="sliders" size={20} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: theme.colors.textPrimary }}>
                Admin & Resilience Switcher
              </Text>
              <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 }}>
                Current: {activeMode === 'festival' ? 'Diwali Festival 🪔' : 'Normal Day (Teal)'}
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
});

export default ProfileScreen;
