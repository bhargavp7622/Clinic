import { StyleSheet } from 'react-native';
import { AppTheme } from '../../types/theme.types';

export const createPrescriptionStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 12,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: theme.colors.textPrimary,
    },
    searchWrapper: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 10,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    listContent: {
      padding: theme.spacing.md,
      gap: 12,
      paddingBottom: 40,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      ...theme.shadows.subtle,
    },
    cardTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    doctorInfo: {
      flex: 1,
      marginRight: 8,
    },
    doctorName: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    clinicName: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    diagnosisTag: {
      backgroundColor: theme.colors.divider,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginTop: 6,
      alignSelf: 'flex-start',
    },
    diagnosisText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    medicinesSummary: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.colors.divider,
      justifyContent: 'space-between',
    },
    medCountText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.primary,
    },
    dateText: {
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
  });
