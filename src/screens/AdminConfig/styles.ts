import { StyleSheet } from 'react-native';
import { AppTheme } from '../../types/theme.types';

export const createAdminStyles = (theme: AppTheme) =>
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
      fontWeight: '800',
      color: theme.colors.textPrimary,
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
    cardTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 14,
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
    switchOptionTitle: {
      fontSize: 13,
      fontWeight: '700',
      marginBottom: 2,
    },
    switchOptionSub: {
      fontSize: 11,
      fontWeight: '500',
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
    toggleTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    toggleDesc: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    jsonPreviewBox: {
      backgroundColor: '#0F172A',
      borderRadius: theme.borderRadius.md,
      padding: 12,
      maxHeight: 180,
    },
    jsonText: {
      color: '#38BDF8',
      fontSize: 11,
      fontFamily: 'Courier',
    },
  });
