import { StyleSheet } from 'react-native';
import { AppTheme } from '@/types/theme.types';

export const createPrescriptionDetailStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
    diagnosisBanner: {
      backgroundColor: theme.colors.badgeBg,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.sm,
      marginTop: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    scheduleSectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    todayBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 9999,
      backgroundColor: theme.colors.badgeBg,
    },
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
    daysBadge: {
      backgroundColor: theme.colors.divider,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
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
      minHeight: theme.minTouchTarget, // Accessible 44pt touch target
      borderRadius: theme.borderRadius.md,
      borderWidth: 1.5,
      paddingHorizontal: 8,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
