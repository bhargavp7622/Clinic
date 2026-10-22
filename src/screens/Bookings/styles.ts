import { StyleSheet } from 'react-native';
import { AppTheme } from '../../types/theme.types';

export const createBookingsListStyles = (theme: AppTheme) =>
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
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    doctorName: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    specialty: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    dateTimeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginVertical: 8,
      backgroundColor: theme.colors.divider,
      padding: 8,
      borderRadius: theme.borderRadius.sm,
    },
    dateTimeText: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    clinicRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    clinicText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.colors.divider,
    },
    feeText: {
      fontSize: 14,
      fontWeight: '800',
      color: theme.colors.textPrimary,
    },
    cancelBtn: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    cancelText: {
      fontSize: 12,
      color: theme.colors.error,
      fontWeight: '600',
    },
  });
