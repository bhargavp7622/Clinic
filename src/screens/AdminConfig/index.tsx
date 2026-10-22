import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../context/ThemeContext';
import { useConfig } from '../../context/ConfigContext';
import { useNetwork } from '../../context/NetworkContext';
import { createAdminStyles } from './styles';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/icons/Icon';
import { StorageService } from '../../services/storage.service';
import { triggerHaptic } from '../../utils/haptics';
import { changeLanguage } from '../../i18n';
import { useTranslation } from 'react-i18next';

export const AdminConfigScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
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

  const handleConfigSwitch = async (mode: 'normal' | 'festival') => {
    triggerHaptic('medium');
    await switchConfigMode(mode);
  };

  const handleResetCache = async () => {
    Alert.alert(
      'Reset Local Cache',
      'This will clear cached config, booking history, and dose records.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearAll();
            await resetDevSettings();
            await switchConfigMode('normal');
            triggerHaptic('success');
            Alert.alert('Success', 'Cache and resilience settings reset to default.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ padding: 4 }}
        >
          <Icon name="chevron-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('admin.title')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. Runtime Config Switcher (Normal Day vs Festival Day) */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>{t('admin.config_switcher')}</Text>
          <Text style={styles.cardSubtitle}>
            Switches layout colors, section order, items & banner with zero code change
          </Text>

          <View style={styles.buttonGrid}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleConfigSwitch('normal')}
              style={[
                styles.switchOption,
                {
                  backgroundColor: activeMode === 'normal' ? '#0F766E' : theme.colors.surface,
                  borderColor: activeMode === 'normal' ? '#0F766E' : theme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.switchOptionTitle,
                  { color: activeMode === 'normal' ? '#FFFFFF' : theme.colors.textPrimary },
                ]}
              >
                Standard Day
              </Text>
              <Text
                style={[
                  styles.switchOptionSub,
                  { color: activeMode === 'normal' ? '#CCFBF1' : theme.colors.textSecondary },
                ]}
              >
                Calm Medical Teal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleConfigSwitch('festival')}
              style={[
                styles.switchOption,
                {
                  backgroundColor: activeMode === 'festival' ? '#C2410C' : theme.colors.surface,
                  borderColor: activeMode === 'festival' ? '#C2410C' : theme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.switchOptionTitle,
                  { color: activeMode === 'festival' ? '#FFFFFF' : theme.colors.textPrimary },
                ]}
              >
                Diwali Festival 🪔
              </Text>
              <Text
                style={[
                  styles.switchOptionSub,
                  { color: activeMode === 'festival' ? '#FFEDD5' : theme.colors.textSecondary },
                ]}
              >
                Festive Saffron & Gold
              </Text>
            </TouchableOpacity>
          </View>

          {fromCache ? (
            <View style={{ marginTop: 10, padding: 8, backgroundColor: '#FEF3C7', borderRadius: 6 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#92400E' }}>
                ℹ Config is currently loaded from Offline Storage Cache
              </Text>
            </View>
          ) : null}
        </View>

        {/* 2. Latency Switcher (0ms, 1000ms, 3000ms) */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>{t('admin.latency_title')}</Text>
          <Text style={styles.cardSubtitle}>
            Simulate 4G / 2G / offline network conditions on mid-range Android phones
          </Text>

          <View style={styles.buttonGrid}>
            {[
              { ms: 0, label: '0ms (Fast)' },
              { ms: 1000, label: '1000ms (4G)' },
              { ms: 3000, label: '3000ms (Slow)' },
            ].map(item => {
              const isSelected = devSettings.simulatedLatencyMs === item.ms;
              return (
                <TouchableOpacity
                  key={item.ms}
                  onPress={() => {
                    triggerHaptic('light');
                    setSimulatedLatency(item.ms);
                  }}
                  style={[
                    styles.switchOption,
                    {
                      backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.switchOptionTitle,
                      { color: isSelected ? '#FFFFFF' : theme.colors.textPrimary },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 3. Failure & Resilience Toggles */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>Resilience & Failure Switches</Text>
          <Text style={styles.cardSubtitle}>
            Simulate server outages and booking conflicts
          </Text>

          {/* Force Network Failure (503) */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>{t('admin.failure_toggle')}</Text>
              <Text style={styles.toggleDesc}>
                Forces API failure to test offline storage caching & skeleton retry states
              </Text>
            </View>
            <Switch
              value={devSettings.forceFailure}
              onValueChange={toggleForceFailure}
              trackColor={{ false: theme.colors.divider, true: theme.colors.error }}
            />
          </View>

          {/* Slot Taken Conflict (409) */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>{t('admin.conflict_toggle')}</Text>
              <Text style={styles.toggleDesc}>
                Forces 409 conflict during booking to test rollback of optimistic update
              </Text>
            </View>
            <Switch
              value={devSettings.simulateSlotConflict}
              onValueChange={toggleSlotConflict}
              trackColor={{ false: theme.colors.divider, true: theme.colors.warning }}
            />
          </View>
        </View>

        {/* 4. Language Switcher */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>{t('admin.language')}</Text>
          <Text style={styles.cardSubtitle}>
            Switch language between English, Hindi, and Telugu
          </Text>

          <View style={styles.buttonGrid}>
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी' },
              { code: 'te', label: 'తెలుగు' },
            ].map(item => {
              const isSelected = i18n.language === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  onPress={() => {
                    triggerHaptic('light');
                    changeLanguage(item.code as any);
                  }}
                  style={[
                    styles.switchOption,
                    {
                      backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.switchOptionTitle,
                      { color: isSelected ? '#FFFFFF' : theme.colors.textPrimary },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 5. Live Remote Config JSON Inspector */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>Live Remote Layout Config (JSON)</Text>
          <Text style={styles.cardSubtitle}>
            Version: {config.version} • Sections: {config.sections?.length || 0}
          </Text>

          <ScrollView style={styles.jsonPreviewBox} nestedScrollEnabled>
            <Text style={styles.jsonText}>
              {JSON.stringify(
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
              )}
            </Text>
          </ScrollView>
        </View>

        {/* 6. Reset Storage */}
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
