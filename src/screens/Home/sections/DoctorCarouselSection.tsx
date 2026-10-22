import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DoctorCarouselItem } from '@types';
import { useAppTheme } from '@context';
import { AppText } from '@common';
import { Icon } from '@components';
import { formatCurrencyInr, triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';

interface DoctorCarouselSectionProps {
  items?: DoctorCarouselItem[];
  onDoctorPress?: (doctor: DoctorCarouselItem) => void;
}

export const DoctorCarouselSection: React.FC<DoctorCarouselSectionProps> = React.memo(({
  items,
  onDoctorPress,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: theme.spacing.md },
      ]}
    >
      {items.map(doctor => (
        <TouchableOpacity
          key={doctor.id}
          activeOpacity={0.85}
          onPress={() => {
            triggerHaptic('light');
            onDoctorPress?.(doctor);
          }}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.xl,
              ...theme.shadows.subtle,
            },
          ]}
        >
          {/* Top Row: Avatar & Rating */}
          <View style={styles.topRow}>
            <Image
              source={{ uri: doctor.photoUrl }}
              style={[
                styles.avatar,
                {
                  borderColor: theme.colors.border,
                },
              ]}
              resizeMode="cover"
            />
            <View style={styles.infoCol}>
              <View style={styles.ratingRow}>
                <Icon name="star" size={13} color={theme.colors.warning} />
                <AppText variant="bodySmall" weight="700" colorKey="warning" style={{ marginLeft: 3 }}>
                  {doctor.rating.toFixed(1)}
                </AppText>
                <AppText
                  variant="bodySmall"
                  colorKey="textSecondary"
                  numberOfLines={1}
                  style={{ marginLeft: 4, flex: 1 }}
                >
                  • {doctor.clinicName.split(',')[1] || 'Clinic'}
                </AppText>
              </View>

              <AppText variant="titleMedium" weight="700" numberOfLines={1}>
                {doctor.name}
              </AppText>

              <AppText variant="bodySmall" colorKey="textSecondary" numberOfLines={1} style={{ marginTop: 1 }}>
                {doctor.specialty}
              </AppText>
            </View>
          </View>

          {/* Languages spoken */}
          {doctor.languages?.length ? (
            <View style={styles.langRow}>
              {doctor.languages.map((lang, idx) => (
                <View
                  key={idx}
                  style={[styles.langChip, { backgroundColor: theme.colors.divider }]}
                >
                  <AppText variant="labelSmall" weight="600" colorKey="textSecondary">
                    {lang}
                  </AppText>
                </View>
              ))}
            </View>
          ) : null}

          {/* Slot & Booking Strip */}
          <View
            style={[
              styles.footer,
              {
                backgroundColor: theme.colors.badgeBg,
                borderTopColor: theme.colors.border,
              },
            ]}
          >
            <View>
              <AppText variant="labelSmall" colorKey="textSecondary" style={{ marginBottom: 2 }}>
                Next Available
              </AppText>
              <View style={styles.slotTimeRow}>
                <Icon name="clock" size={12} color={theme.colors.primary} />
                <AppText variant="labelSmall" weight="700" colorKey="primary">
                  {doctor.nextSlot}
                </AppText>
              </View>
            </View>

            <View style={styles.feeWrapper}>
              <AppText variant="titleLarge" weight="800">
                {formatCurrencyInr(doctor.feeInr)}
              </AppText>
              <View
                style={[
                  styles.bookBtn,
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: theme.borderRadius.sm,
                  },
                ]}
              >
                <AppText variant="labelSmall" weight="700" color={theme.colors.surface}>
                  {t('common.book')}
                </AppText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 6,
    gap: 12,
  },
  card: {
    width: 275,
    borderWidth: 1,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
  },
  infoCol: {
    marginLeft: 10,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  langRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 6,
  },
  langChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  slotTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  feeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
