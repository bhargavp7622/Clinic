import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme, useConfig } from '@context';
import { AppHeader, AppText } from '@common';
import { Icon } from '@components';
import { triggerHaptic } from '@utils';
import { changeLanguage } from '@/i18n';
import { useTranslation } from 'react-i18next';

export const ProfileScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const { activeMode } = useConfig();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: 'en' | 'hi' | 'te') => {
    triggerHaptic('light');
    changeLanguage(lang);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AppHeader title={t('profile.title')} showBack={false} />

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
            <AppText variant="titleMedium" weight="700">
              Bhargav Parmar
            </AppText>
            <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
              {t('profile.phone_city')}
            </AppText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                marginTop: 6,
                backgroundColor: theme.colors.badgeBg,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 4,
                alignSelf: 'flex-start',
              }}
            >
              <Icon name="check-circle" size={11} color={theme.colors.success} />
              <AppText variant="labelSmall" weight="700" colorKey="success">
                {t('profile.verified_whatsapp')}
              </AppText>
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
          <AppText variant="titleMedium" weight="700" style={{ marginBottom: 4 }}>
            {t('profile.app_language')}
          </AppText>
          <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginBottom: 12 }}>
            {t('profile.adapted_for_elders')}
          </AppText>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी' },
              { code: 'te', label: 'తెలుగు' },
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
                  <AppText
                    variant="labelLarge"
                    weight="700"
                    color={isActive ? theme.colors.surface : theme.colors.textPrimary}
                  >
                    {item.label}
                  </AppText>
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
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            borderWidth: 1,
            borderColor: theme.colors.border,
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
                backgroundColor: theme.colors.badgeBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="sliders" size={20} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="titleMedium" weight="700">
                {t('profile.admin_control')}
              </AppText>
              <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
                {t('profile.current_theme', {
                  theme: activeMode === 'festival' ? t('admin.festival_config') : t('admin.normal_config'),
                })}
              </AppText>
            </View>
          </View>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
});

export default ProfileScreen;
