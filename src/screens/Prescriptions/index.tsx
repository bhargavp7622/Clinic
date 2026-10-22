import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../context/ThemeContext';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { createPrescriptionStyles } from './styles';
import { Prescription } from '../../types/prescription.types';
import { SearchBar } from '../../components/common/SearchBar';
import { EmptyState } from '../../components/common/EmptyState';
import { Skeleton } from '../../components/common/Skeleton';
import { Icon } from '../../components/icons/Icon';
import { formatDateDisplay } from '../../utils/formatters';
import { triggerHaptic } from '../../utils/haptics';
import { useTranslation } from 'react-i18next';

export const PrescriptionsScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const styles = useMemo(() => createPrescriptionStyles(theme), [theme]);
  const { t } = useTranslation();
  const { prescriptions, isLoading, refreshPrescriptions } = usePrescriptions();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrescriptions = useMemo(() => {
    if (!searchQuery.trim()) return prescriptions;
    const q = searchQuery.toLowerCase().trim();
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

  const renderItem = ({ item }: { item: Prescription }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleOpenDetail(item)}
        style={styles.card}
      >
        <View style={styles.cardTopRow}>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{item.doctorName}</Text>
            <Text style={styles.clinicName}>{item.clinicName}</Text>
            {item.diagnosis ? (
              <View style={styles.diagnosisTag}>
                <Text style={styles.diagnosisText}>{item.diagnosis}</Text>
              </View>
            ) : null}
          </View>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
        </View>

        <View style={styles.medicinesSummary}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name="pill" size={14} color={theme.colors.primary} />
            <Text style={styles.medCountText}>
              {item.medicines.length} Prescribed Medicines
            </Text>
          </View>

          <Text style={styles.dateText}>
            {formatDateDisplay(item.issuedAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('prescriptions.title')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Icon name="file-text" size={20} color={theme.colors.primary} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <SearchBar
          placeholder="Search prescriptions or medicines..."
          onSearchChange={setSearchQuery}
        />
      </View>

      {/* Prescriptions List */}
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
          description="Prescriptions issued by Tapza partner doctors will appear here automatically."
        />
      ) : (
        <FlatList
          data={filteredPrescriptions}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
