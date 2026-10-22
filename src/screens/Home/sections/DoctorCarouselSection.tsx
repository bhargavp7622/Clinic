import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { DoctorCarouselItem } from '../../../types/config.types';
import { useAppTheme } from '../../../context/ThemeContext';
import { formatCurrencyInr } from '../../../utils/formatters';
import { Icon } from '../../../components/icons/Icon';
import { triggerHaptic } from '../../../utils/haptics';

interface DoctorCarouselSectionProps {
  items?: DoctorCarouselItem[];
  onDoctorPress?: (doctor: DoctorCarouselItem) => void;
}

export const DoctorCarouselSection: React.FC<DoctorCarouselSectionProps> = React.memo(({
  items,
  onDoctorPress,
}) => {
  const theme = useAppTheme();

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
                <Icon name="star" size={13} color="#F59E0B" />
                <Text style={styles.ratingText}>{doctor.rating.toFixed(1)}</Text>
                <Text style={[styles.clinicLocation, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                  • {doctor.clinicName.split(',')[1] || 'Clinic'}
                </Text>
              </View>

              <Text
                style={[
                  styles.doctorName,
                  {
                    color: theme.colors.textPrimary,
                    fontSize: theme.typography.titleMedium.fontSize,
                  },
                ]}
                numberOfLines={1}
              >
                {doctor.name}
              </Text>

              <Text
                style={[
                  styles.specialty,
                  {
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.bodySmall.fontSize,
                  },
                ]}
                numberOfLines={1}
              >
                {doctor.specialty}
              </Text>
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
                  <Text style={[styles.langText, { color: theme.colors.textSecondary }]}>
                    {lang}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Slot & Booking Strip */}
          <View
            style={[
              styles.footer,
              {
                backgroundColor: theme.isFestival ? '#FFFBEB' : '#F8FAFC',
                borderTopColor: theme.colors.border,
              },
            ]}
          >
            <View>
              <Text style={[styles.slotLabel, { color: theme.colors.textSecondary }]}>
                Next Available
              </Text>
              <View style={styles.slotTimeRow}>
                <Icon name="clock" size={12} color={theme.colors.primary} />
                <Text
                  style={[
                    styles.slotTime,
                    {
                      color: theme.colors.primary,
                      fontSize: theme.typography.labelSmall.fontSize,
                    },
                  ]}
                >
                  {doctor.nextSlot}
                </Text>
              </View>
            </View>

            <View style={styles.feeWrapper}>
              <Text style={[styles.feeText, { color: theme.colors.textPrimary }]}>
                {formatCurrencyInr(doctor.feeInr)}
              </Text>
              <View
                style={[
                  styles.bookBtn,
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: theme.borderRadius.sm,
                  },
                ]}
              >
                <Text style={styles.bookBtnText}>Book</Text>
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
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 3,
  },
  clinicLocation: {
    fontSize: 11,
    marginLeft: 4,
    flex: 1,
  },
  doctorName: {
    fontWeight: '700',
  },
  specialty: {
    marginTop: 1,
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
  langText: {
    fontSize: 10,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  slotLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
  },
  slotTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  slotTime: {
    fontWeight: '700',
  },
  feeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feeText: {
    fontSize: 14,
    fontWeight: '800',
  },
  bookBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
