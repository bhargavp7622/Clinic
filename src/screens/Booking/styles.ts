import { StyleSheet } from 'react-native';
import { AppTheme } from '@/types/theme.types';

export const createBookingStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    searchWrapper: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 10,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    dateStripContainer: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    dateScroll: {
      paddingHorizontal: theme.spacing.md,
      gap: 10,
    },
    dateCard: {
      width: 58,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      borderWidth: 1.5,
    },
    listContent: {
      padding: theme.spacing.md,
      gap: 12,
      paddingBottom: 40,
    },
    doctorCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      ...theme.shadows.subtle,
    },
    docHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    docAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 1.5,
    },
    docInfo: {
      marginLeft: 12,
      flex: 1,
    },
    docMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 6,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    clinicRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 8,
    },
    docFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: theme.colors.divider,
    },
    sheetHeader: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    sheetBody: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: 14,
      maxHeight: 400,
    },
    slotGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 16,
    },
    slotPill: {
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1.5,
      minWidth: 96,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetFooter: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: 10,
    },
  });
