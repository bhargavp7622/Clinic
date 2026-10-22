import { StyleSheet, Platform } from 'react-native';
import { AppTheme } from '@/types/theme.types';

export const createHomeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerWrapper: {
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      zIndex: 10,
      ...theme.shadows.subtle,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingTop: Platform.OS === 'ios' ? 8 : 12,
      paddingBottom: 8,
    },
    locationContainer: {
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    brandTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    adminButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.divider,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchContainer: {
      paddingHorizontal: theme.spacing.md,
      paddingBottom: 10,
    },
    festivalBannerStrip: {
      backgroundColor: theme.colors.accent,
      paddingVertical: 6,
      paddingHorizontal: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    skeletonsContainer: {
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md,
    },
  });
