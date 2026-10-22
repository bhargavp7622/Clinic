import { StyleSheet } from 'react-native';
import { AppTheme } from '../../types/theme.types';

export const createPrescriptionDetailStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 12,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    scrollContent: {
      padding: theme.spacing.md,
      gap: 16,
      paddingBottom: 40,
    },
    clinicCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      ...theme.shadows.subtle,
    },
    clinicTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    doctorAvatarBox: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.divider,
      alignItems: 'center',
      justifyContent: 'center',
    },
    doctorTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    clinicSubtitle: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    diagnosisBanner: {
      backgroundColor: theme.isFestival ? '#FEF3C7' : '#F0FDFA',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.sm,
      marginTop: 12,
      borderWidth: 1,
      borderColor: theme.isFestival ? '#FDE68A' : '#CCFBF1',
    },
    diagnosisLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    diagnosisValue: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginTop: 2,
    },
    scheduleSectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    scheduleSectionTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: theme.colors.textPrimary,
    },
    todayBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 9999,
      backgroundColor: theme.colors.badgeBg,
    },
    todayBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.colors.badgeText,
    },
    // Medicine card styles
    medicineCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      ...theme.shadows.subtle,
    },
    medHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    medName: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      flex: 1,
      marginRight: 8,
    },
    daysBadge: {
      backgroundColor: theme.colors.divider,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    daysText: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.colors.textSecondary,
    },
    medDose: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primary,
      marginTop: 4,
    },
    instructionsText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
      marginTop: 6,
    },
    // Timings slot buttons row (Morning / Afternoon / Night)
    timingSlotsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.divider,
    },
    timingButton: {
      flex: 1,
      minHeight: theme.minTouchTarget, // ensures 44pt accessible touch target
      borderRadius: theme.borderRadius.md,
      borderWidth: 1.5,
      paddingHorizontal: 8,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    timingLabel: {
      fontSize: 11,
      fontWeight: '700',
      marginBottom: 3,
    },
    statusLabel: {
      fontSize: 10,
      fontWeight: '600',
    },
  });
