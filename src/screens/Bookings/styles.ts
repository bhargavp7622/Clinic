import { StyleSheet } from 'react-native';
import { AppTheme } from '@/types/theme.types';

export const createBookingsListStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
    dateTimeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginVertical: 8,
      backgroundColor: theme.colors.divider,
      padding: 8,
      borderRadius: theme.borderRadius.sm,
    },
    clinicRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
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
    cancelBtn: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
  });
