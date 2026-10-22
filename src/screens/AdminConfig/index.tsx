import React, { useMemo, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme, useConfig, useNetwork } from '@context';
import { AppHeader, AppText, Button } from '@common';
import { Icon } from '@components';
import { StorageService } from '@services';
import { triggerHaptic } from '@utils';
import { changeLanguage } from '@/i18n';
import { useTranslation } from 'react-i18next';
import { createAdminStyles } from './styles';

const LATENCY_OPTIONS = [
  { ms: 0, labelKey: 'admin.latency_0' },
  { ms: 1000, labelKey: 'admin.latency_1000' },
  { ms: 3000, labelKey: 'admin.latency_3000' },
];

const LANGUAGE_OPTIONS: Array<{ code: 'en' | 'hi' | 'te'; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' },
];

export const AdminConfigScreen: React.FC = React.memo(() => {
  const theme = useAppTheme();
  const styles = useMemo(() => createAdminStyles(theme), [theme]);
  const { t, i18n } = useTranslation();

  const { config, activeMode, switchConfigMode, fromCache } = useConfig();
  const {
    devSettings,
    setSimulatedLatency,
    toggleForceFailure,
    toggleSlotConflict,
    resetDevSettings,
  } = useNetwork();

  const handleConfigSwitch = useCallback(async (mode: 'normal' | 'festival') => {
    triggerHaptic('medium');
    await switchConfigMode(mode);
  }, [switchConfigMode]);

  const handleLatencyChange = useCallback((ms: number) => {
    triggerHaptic('light');
    setSimulatedLatency(ms);
  }, [setSimulatedLatency]);

  const handleLanguageChange = useCallback((code: 'en' | 'hi' | 'te') => {
    triggerHaptic('light');
    changeLanguage(code);
  }, []);

  const handleResetCache = useCallback(async () => {
    Alert.alert(
      t('admin.reset_confirm_title'),
      t('admin.reset_confirm_message'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.retry'),
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearAll();
            await resetDevSettings();
            await switchConfigMode('normal');
            triggerHaptic('success');
            Alert.alert(t('common.done'), t('admin.storage_cleared'));
          },
        },
      ]
    );
  }, [resetDevSettings, switchConfigMode, t]);

  const jsonSummary = useMemo(() => {
    return JSON.stringify(
      {
        version: config.version,
        theme: config.theme,
        sections: config.sections.map(s => ({
          id: s.id,
          type: s.type,
          background: s.background,
          itemsCount: s.items?.length,
        })),
      },
      null,
      2
    );
  }, [config]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title={t('admin.title')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCard}>
          <AppText variant="titleMedium" weight="700" style={{ marginBottom: 4 }}>
            {t('admin.config_switcher')}
          </AppText>
          <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginBottom: 14 }}>
            {t('admin.config_switcher_sub')}
          </AppText>

          <View style={styles.buttonGrid}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleConfigSwitch('normal')}
              style={[
                styles.switchOption,
                {
                  backgroundColor: activeMode === 'normal' ? theme.colors.primary : theme.colors.surface,
                  borderColor: activeMode === 'normal' ? theme.colors.primary : theme.colors.border,
                },
              ]}
            >
              <AppText
                variant="labelLarge"
                weight="700"
                color={activeMode === 'normal' ? theme.colors.surface : theme.colors.textPrimary}
                style={{ marginBottom: 2 }}
              >
                {t('admin.normal_config')}
              </AppText>
              <AppText
                variant="labelSmall"
                color={activeMode === 'normal' ? theme.colors.surface : theme.colors.textSecondary}
              >
                {t('admin.normal_config_desc')}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleConfigSwitch('festival')}
              style={[
                styles.switchOption,
                {
                  backgroundColor: activeMode === 'festival' ? theme.colors.primary : theme.colors.surface,
                  borderColor: activeMode === 'festival' ? theme.colors.primary : theme.colors.border,
                },
              ]}
            >
              <AppText
                variant="labelLarge"
                weight="700"
                color={activeMode === 'festival' ? theme.colors.surface : theme.colors.textPrimary}
                style={{ marginBottom: 2 }}
              >
                {t('admin.festival_config')}
              </AppText>
              <AppText
                variant="labelSmall"
                color={activeMode === 'festival' ? theme.colors.surface : theme.colors.textSecondary}
              >
                {t('admin.festival_config_desc')}
              </AppText>
            </TouchableOpacity>
          </View>

          {fromCache ? (
            <View style={{ marginTop: 10, padding: 8, backgroundColor: theme.colors.badgeBg, borderRadius: 6 }}>
              <AppText variant="labelSmall" weight="700" colorKey="primary">
                {t('admin.loaded_from_cache')}
              </AppText>
            </View>
          ) : null}
        </View>

        <View style={styles.sectionCard}>
          <AppText variant="titleMedium" weight="700" style={{ marginBottom: 4 }}>
            {t('admin.latency_title')}
          </AppText>
          <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginBottom: 14 }}>
            {t('admin.latency_desc')}
          </AppText>

          <View style={styles.buttonGrid}>
            {LATENCY_OPTIONS.map(item => {
              const isSelected = devSettings.simulatedLatencyMs === item.ms;
              return (
                <TouchableOpacity
                  key={item.ms}
                  onPress={() => handleLatencyChange(item.ms)}
                  style={[
                    styles.switchOption,
                    {
                      backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                >
                  <AppText
                    variant="labelLarge"
                    weight="700"
                    color={isSelected ? theme.colors.surface : theme.colors.textPrimary}
                  >
                    {t(item.labelKey)}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <AppText variant="titleMedium" weight="700" style={{ marginBottom: 4 }}>
            {t('admin.resilience_switches')}
          </AppText>
          <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginBottom: 14 }}>
            {t('admin.resilience_desc')}
          </AppText>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <AppText variant="titleMedium" weight="700">
                {t('admin.failure_toggle')}
              </AppText>
              <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
                {t('admin.failure_desc')}
              </AppText>
            </View>
            <Switch
              value={devSettings.forceFailure}
              onValueChange={toggleForceFailure}
              trackColor={{ false: theme.colors.divider, true: theme.colors.error }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <AppText variant="titleMedium" weight="700">
                {t('admin.conflict_toggle')}
              </AppText>
              <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
                {t('admin.conflict_desc')}
              </AppText>
            </View>
            <Switch
              value={devSettings.simulateSlotConflict}
              onValueChange={toggleSlotConflict}
              trackColor={{ false: theme.colors.divider, true: theme.colors.warning }}
            />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <AppText variant="titleMedium" weight="700" style={{ marginBottom: 4 }}>
            {t('admin.language')}
          </AppText>
          <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginBottom: 14 }}>
            {t('admin.language_desc')}
          </AppText>

          <View style={styles.buttonGrid}>
            {LANGUAGE_OPTIONS.map(item => {
              const isSelected = i18n.language === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  onPress={() => handleLanguageChange(item.code)}
                  style={[
                    styles.switchOption,
                    {
                      backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                >
                  <AppText
                    variant="labelLarge"
                    weight="700"
                    color={isSelected ? theme.colors.surface : theme.colors.textPrimary}
                  >
                    {item.label}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <AppText variant="titleMedium" weight="700" style={{ marginBottom: 4 }}>
            {t('admin.live_json')}
          </AppText>
          <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginBottom: 14 }}>
            Version: {config.version} • Sections: {config.sections?.length || 0}
          </AppText>

          <ScrollView style={styles.jsonPreviewBox} nestedScrollEnabled>
            <AppText variant="bodySmall" colorKey="primary" style={{ fontFamily: 'Courier' }}>
              {jsonSummary}
            </AppText>
          </ScrollView>
        </View>

        <Button
          title={t('admin.clear_storage')}
          onPress={handleResetCache}
          variant="outline"
          icon={<Icon name="refresh" size={16} color={theme.colors.primary} />}
          style={{ width: '100%', marginBottom: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
});

export default AdminConfigScreen;
