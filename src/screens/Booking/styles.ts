import { StyleSheet } from 'react-native';
import { AppTheme } from '../../types/theme.types';

export const createBookingStyles = (theme: AppTheme) =>
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
    dateStripLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      paddingHorizontal: theme.spacing.md,
      marginBottom: 8,
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
    dateDayName: {
      fontSize: 11,
      fontWeight: '600',
      marginBottom: 4,
    },
    dateDayNumber: {
      fontSize: 16,
      fontWeight: '800',
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
    docName: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    docSpecialty: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.textSecondary,
      marginTop: 2,
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
    metaText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    clinicRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 8,
    },
    clinicText: {
      fontSize: 11,
      color: theme.colors.textSecondary,
      flex: 1,
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
    feeLabel: {
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
    feeAmount: {
      fontSize: 16,
      fontWeight: '800',
      color: theme.colors.textPrimary,
    },
    // BottomSheet slot picker styles
    sheetHeader: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    sheetTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    sheetSubtitle: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    sheetBody: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: 14,
      maxHeight: 400,
    },
    slotSectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 10,
      marginTop: 6,
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
    slotText: {
      fontSize: 12,
      fontWeight: '700',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      fontWeight: '600',
      marginTop: 8,
      textAlign: 'center',
    },
    sheetFooter: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: 10,
    },
  });
