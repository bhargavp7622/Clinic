import React, { useMemo, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useAppTheme, usePrescriptions } from '@context';
import { AppHeader, AppText } from '@common';
import { Icon } from '@components';
import { Medicine, MedicineTiming } from '@types';
import { formatDateDisplay } from '@utils';
import { useTranslation } from 'react-i18next';
import { createPrescriptionDetailStyles } from './styles';

interface TimingButtonProps {
  timing: MedicineTiming;
  label: string;
  isApplicable: boolean;
  taken: boolean;
  theme: any;
  styles: any;
  t: (key: string) => string;
  onPress: () => void;
}

const TimingButton: React.FC<TimingButtonProps> = React.memo(({
  label,
  isApplicable,
  taken,
  theme,
  styles,
  t,
  onPress,
}) => {
  if (!isApplicable) {
    return (
      <View
        style={[
          styles.timingButton,
          {
            backgroundColor: theme.colors.divider,
            borderColor: 'transparent',
            opacity: 0.4,
          },
        ]}
      >
        <AppText variant="labelSmall" weight="700" colorKey="textSecondary" style={{ marginBottom: 3 }}>
          {label}
        </AppText>
        <AppText variant="labelSmall" colorKey="textSecondary">
          —
        </AppText>
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.timingButton,
        {
          backgroundColor: taken ? theme.colors.badgeBg : theme.colors.surface,
          borderColor: taken ? theme.colors.success : theme.colors.border,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {taken ? (
          <Icon name="check-circle" size={13} color={theme.colors.success} strokeWidth={2.5} />
        ) : null}
        <AppText
          variant="labelSmall"
          weight="700"
          color={taken ? theme.colors.success : theme.colors.textPrimary}
          style={{ marginBottom: 3 }}
        >
          {label}
        </AppText>
      </View>

      <AppText
        variant="labelSmall"
        weight={taken ? '700' : '500'}
        color={taken ? theme.colors.success : theme.colors.textSecondary}
      >
        {taken ? t('prescriptions.taken') : t('prescriptions.mark_as_taken')}
      </AppText>
    </TouchableOpacity>
  );
});

interface MedicineCardProps {
  med: Medicine;
  prescriptionId: string;
  theme: any;
  styles: any;
  t: (key: string, options?: any) => string;
  isDoseTaken: (pId: string, mId: string, timing: MedicineTiming) => boolean;
  onToggle: (mId: string, timing: MedicineTiming) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = React.memo(({
  med,
  prescriptionId,
  theme,
  styles,
  t,
  isDoseTaken,
  onToggle,
}) => {
  return (
    <View style={styles.medicineCard}>
      <View style={styles.medHeader}>
        <AppText variant="titleMedium" weight="700" style={{ flex: 1, marginRight: 8 }}>
          {med.name}
        </AppText>
        <View style={styles.daysBadge}>
          <AppText variant="labelSmall" weight="700" colorKey="textSecondary">
            {t('prescriptions.days', { count: med.days })}
          </AppText>
        </View>
      </View>

      <AppText variant="bodySmall" weight="600" colorKey="primary" style={{ marginTop: 4 }}>
        {t('prescriptions.dosage', { dose: med.dose })}
      </AppText>

      {med.instructions ? (
        <AppText
          variant="bodySmall"
          colorKey="textSecondary"
          style={{ fontStyle: 'italic', marginTop: 6 }}
        >
          "{med.instructions}"
        </AppText>
      ) : null}

      <View style={styles.timingSlotsContainer}>
        {(['morning', 'afternoon', 'night'] as MedicineTiming[]).map(timing => (
          <TimingButton
            key={timing}
            timing={timing}
            label={t(`prescriptions.${timing}`)}
            isApplicable={med.timing.includes(timing)}
            taken={isDoseTaken(prescriptionId, med.id, timing)}
            theme={theme}
            styles={styles}
            t={t}
            onPress={() => onToggle(med.id, timing)}
          />
        ))}
      </View>
    </View>
  );
});

export const PrescriptionDetailScreen: React.FC = React.memo(() => {
  const route = useRoute<any>();
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
        <AppHeader title={t('prescriptions.details_title')} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <AppText colorKey="textSecondary">{t('prescriptions.not_found')}</AppText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title={t('prescriptions.details_title')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.clinicCard}>
          <View style={styles.clinicTop}>
            <View style={styles.doctorAvatarBox}>
              <Icon name="stethoscope" size={22} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="titleMedium" weight="700">
                {prescription.doctorName}
              </AppText>
              <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
                {prescription.clinicName}
              </AppText>
              <AppText variant="labelSmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
                {t('prescriptions.issued_on', { date: formatDateDisplay(prescription.issuedAt) })}
              </AppText>
            </View>
          </View>

          {prescription.diagnosis ? (
            <View style={styles.diagnosisBanner}>
              <AppText variant="labelSmall" weight="600" colorKey="textSecondary">
                {t('prescriptions.diagnosis_reason')}
              </AppText>
              <AppText variant="bodyMedium" weight="700" style={{ marginTop: 2 }}>
                {prescription.diagnosis}
              </AppText>
            </View>
          ) : null}
        </View>

        <View style={styles.scheduleSectionHeader}>
          <AppText variant="titleLarge" weight="800">
            {t('prescriptions.dose_schedule')}
          </AppText>
          <View style={styles.todayBadge}>
            <AppText variant="labelSmall" weight="700" colorKey="badgeText">
              {t('prescriptions.today', { date: todayDateStr })}
            </AppText>
          </View>
        </View>

        {prescription.medicines.map(med => (
          <MedicineCard
            key={med.id}
            med={med}
            prescriptionId={prescription.id}
            theme={theme}
            styles={styles}
            t={t}
            isDoseTaken={isDoseTaken}
            onToggle={handleToggle}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
});

export default PrescriptionDetailScreen;
