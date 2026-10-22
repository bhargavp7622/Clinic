import { StyleSheet } from 'react-native';
import { AppTheme } from '@/types/theme.types';

export const createAdminStyles = (theme: AppTheme) =>
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
    sectionCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      ...theme.shadows.subtle,
    },
    buttonGrid: {
      flexDirection: 'row',
      gap: 10,
    },
    switchOption: {
      flex: 1,
      minHeight: 48,
      borderWidth: 1.5,
      borderRadius: theme.borderRadius.md,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: theme.colors.divider,
    },
    toggleInfo: {
      flex: 1,
      marginRight: 12,
    },
    jsonPreviewBox: {
      backgroundColor: theme.colors.divider,
      borderRadius: theme.borderRadius.md,
      padding: 12,
      maxHeight: 180,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });
