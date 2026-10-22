import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme, usePrescriptions } from '@context';
import { AppText, AppHeader, SearchBar, EmptyState, Skeleton } from '@common';
import { Icon } from '@components';
import { Prescription } from '@types';
import { formatDateDisplay, triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';
import { createPrescriptionStyles } from './styles';

interface PrescriptionCardItemProps {
  item: Prescription;
  theme: any;
  styles: any;
  t: (key: string, options?: any) => string;
  onPress: (prescription: Prescription) => void;
}

const PrescriptionCardItem: React.FC<PrescriptionCardItemProps> = React.memo(({
  item,
  theme,
  styles,
  t,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item)}
      style={styles.card}
    >
      <View style={styles.cardTopRow}>
        <View style={styles.doctorInfo}>
          <AppText variant="titleMedium" weight="700">
            {item.doctorName}
          </AppText>
          <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
            {item.clinicName}
          </AppText>
          {item.diagnosis ? (
            <View style={styles.diagnosisTag}>
              <AppText variant="labelSmall" weight="600" colorKey="textSecondary">
                {item.diagnosis}
              </AppText>
            </View>
          ) : null}
        </View>
        <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
      </View>

      <View style={styles.medicinesSummary}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Icon name="pill" size={14} color={theme.colors.primary} />
          <AppText variant="labelLarge" weight="700" colorKey="primary">
            {t('prescriptions.prescribed_medicines', { count: item.medicines.length })}
          </AppText>
        </View>

        <AppText variant="bodySmall" colorKey="textSecondary">
          {formatDateDisplay(item.issuedAt)}
        </AppText>
      </View>
    </TouchableOpacity>
  );
});

export const PrescriptionsScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const styles = useMemo(() => createPrescriptionStyles(theme), [theme]);
  const { t } = useTranslation();
  const { prescriptions, isLoading, refreshPrescriptions } = usePrescriptions();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrescriptions = useMemo(() => {
    if (!searchQuery.trim()) return prescriptions;
    const q = searchQuery.toLowerCase();
    return prescriptions.filter(
      p =>
        p.doctorName.toLowerCase().includes(q) ||
        p.clinicName.toLowerCase().includes(q) ||
        p.diagnosis?.toLowerCase().includes(q) ||
        p.medicines.some(m => m.name.toLowerCase().includes(q))
    );
  }, [prescriptions, searchQuery]);

  const handleOpenDetail = useCallback(
    (prescription: Prescription) => {
      triggerHaptic('light');
      navigation.navigate('PrescriptionDetail', {
        prescriptionId: prescription.id,
        doctorName: prescription.doctorName,
      });
    },
    [navigation]
  );

  const keyExtractor = useCallback((item: Prescription) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Prescription }) => (
      <PrescriptionCardItem
        item={item}
        theme={theme}
        styles={styles}
        t={t}
        onPress={handleOpenDetail}
      />
    ),
    [theme, styles, t, handleOpenDetail]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title={t('prescriptions.title')}
        showBack={false}
        rightAction={<Icon name="file-text" size={20} color={theme.colors.primary} />}
      />

      <View style={styles.searchWrapper}>
        <SearchBar
          placeholder={t('prescriptions.search_placeholder')}
          onSearchChange={setSearchQuery}
        />
      </View>

      {isLoading && !prescriptions.length ? (
        <View style={{ padding: 16, gap: 12 }}>
          <Skeleton height={110} borderRadius={theme.borderRadius.lg} />
          <Skeleton height={110} borderRadius={theme.borderRadius.lg} />
          <Skeleton height={110} borderRadius={theme.borderRadius.lg} />
        </View>
      ) : filteredPrescriptions.length === 0 ? (
        <EmptyState
          iconName="file-text"
          title={t('prescriptions.empty_prescriptions')}
          description={t('prescriptions.empty_prescriptions_desc')}
        />
      ) : (
        <FlatList
          data={filteredPrescriptions}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          windowSize={5}
          initialNumToRender={5}
          updateCellsBatchingPeriod={50}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refreshPrescriptions()}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
});

export default PrescriptionsScreen;
