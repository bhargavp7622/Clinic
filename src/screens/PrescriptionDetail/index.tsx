import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../context/ThemeContext';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { createPrescriptionDetailStyles } from './styles';
import { Medicine, MedicineTiming } from '../../types/prescription.types';
import { Icon } from '../../components/icons/Icon';
import { formatDateDisplay } from '../../utils/formatters';
import { useTranslation } from 'react-i18next';

export const PrescriptionDetailScreen: React.FC = React.memo(() => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const styles = useMemo(() => createPrescriptionDetailStyles(theme), [theme]);
  const { t } = useTranslation();
  const { prescriptionId } = route.params || {};

  const { getPrescriptionById, isDoseTaken, toggleDoseTaken, todayDateStr } = usePrescriptions();
  const prescription = getPrescriptionById(prescriptionId);

  const handleToggle = useCallback(
    async (medicineId: string, timing: MedicineTiming) => {
      await toggleDoseTaken(prescriptionId, medicineId, timing);
    },
    [prescriptionId, toggleDoseTaken]
  );

  if (!prescription) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <Icon name="chevron-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prescription Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: theme.colors.textSecondary }}>Prescription not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderTimingButton = (med: Medicine, timing: MedicineTiming, label: string, icon: any) => {
    const isApplicable = med.timing.includes(timing);
    if (!isApplicable) {
      return (
        <View
          key={timing}
          style={[
            styles.timingButton,
            {
              backgroundColor: theme.colors.divider,
              borderColor: 'transparent',
              opacity: 0.4,
            },
          ]}
        >
          <Text style={[styles.timingLabel, { color: theme.colors.textSecondary }]}>
            {label}
          </Text>
          <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>
            —
          </Text>
        </View>
      );
    }

    const taken = isDoseTaken(prescription.id, med.id, timing);

    return (
      <TouchableOpacity
        key={timing}
        activeOpacity={0.75}
        onPress={() => handleToggle(med.id, timing)}
        style={[
          styles.timingButton,
          {
            backgroundColor: taken ? '#DCFCE7' : theme.colors.surface,
            borderColor: taken ? '#22C55E' : theme.colors.border,
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          {taken ? (
            <Icon name="check-circle" size={13} color="#15803D" strokeWidth={2.5} />
          ) : null}
          <Text
            style={[
              styles.timingLabel,
              { color: taken ? '#15803D' : theme.colors.textPrimary },
            ]}
          >
            {label}
          </Text>
        </View>

        <Text
          style={[
            styles.statusLabel,
            {
              color: taken ? '#15803D' : theme.colors.textSecondary,
              fontWeight: taken ? '700' : '500',
            },
          ]}
        >
          {taken ? t('prescriptions.taken') : t('prescriptions.mark_as_taken')}
        </Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Prescription & Schedule</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Clinic & Doctor Header Card */}
        <View style={styles.clinicCard}>
          <View style={styles.clinicTop}>
            <View style={styles.doctorAvatarBox}>
              <Icon name="stethoscope" size={22} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.doctorTitle}>{prescription.doctorName}</Text>
              <Text style={styles.clinicSubtitle}>{prescription.clinicName}</Text>
              <Text style={{ fontSize: 11, color: theme.colors.textSecondary, marginTop: 2 }}>
                Issued: {formatDateDisplay(prescription.issuedAt)}
              </Text>
            </View>
          </View>

          {prescription.diagnosis ? (
            <View style={styles.diagnosisBanner}>
              <Text style={styles.diagnosisLabel}>Diagnosis / Health Reason</Text>
              <Text style={styles.diagnosisValue}>{prescription.diagnosis}</Text>
            </View>
          ) : null}
        </View>

        {/* Schedule Header */}
        <View style={styles.scheduleSectionHeader}>
          <Text style={styles.scheduleSectionTitle}>
            {t('prescriptions.dose_schedule')}
          </Text>
          <View style={styles.todayBadge}>
            <Text style={styles.todayBadgeText}>Today: {todayDateStr}</Text>
          </View>
        </View>

        {/* Medicines List with Morning / Afternoon / Night Buttons */}
        {prescription.medicines.map(med => (
          <View key={med.id} style={styles.medicineCard}>
            <View style={styles.medHeader}>
              <Text style={styles.medName}>{med.name}</Text>
              <View style={styles.daysBadge}>
                <Text style={styles.daysText}>{med.days} Days</Text>
              </View>
            </View>

            <Text style={styles.medDose}>Dosage: {med.dose}</Text>

            {med.instructions ? (
              <Text style={styles.instructionsText}>
                "{med.instructions}"
              </Text>
            ) : null}

            {/* Morning / Afternoon / Night Timing Slots */}
            <View style={styles.timingSlotsContainer}>
              {renderTimingButton(med, 'morning', t('prescriptions.morning'), 'sunrise')}
              {renderTimingButton(med, 'afternoon', t('prescriptions.afternoon'), 'sun')}
              {renderTimingButton(med, 'night', t('prescriptions.night'), 'moon')}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
});

export default PrescriptionDetailScreen;
