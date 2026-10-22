import React, { useCallback } from 'react';
import { FlatList, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DoctorCarouselItem } from '@types';
import { useAppTheme } from '@context';
import { AppText } from '@common';
import { Icon } from '@components';
import { formatCurrencyInr, triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';

interface DoctorCarouselCardProps {
  doctor: DoctorCarouselItem;
  theme: any;
  t: (key: string) => string;
  onPress?: (doctor: DoctorCarouselItem) => void;
}

const DoctorCarouselCard: React.FC<DoctorCarouselCardProps> = React.memo(({
  doctor,
  theme,
  t,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        triggerHaptic('light');
        onPress?.(doctor);
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
      <View style={styles.topRow}>
        <Image
          source={{ uri: doctor.photoUrl }}
          style={[styles.avatar, { borderColor: theme.colors.border }]}
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

      <View style={[styles.bottomRow, { borderTopColor: theme.colors.divider }]}>
        <View>
          <AppText variant="labelSmall" colorKey="textSecondary">
            {t('home.next_slot')}
          </AppText>
          <AppText variant="labelSmall" weight="700" colorKey="success">
            {doctor.nextSlot}
          </AppText>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <AppText variant="labelSmall" colorKey="textSecondary">
            {t('common.fee')}
          </AppText>
          <AppText variant="titleLarge" weight="800">
            {formatCurrencyInr(doctor.feeInr)}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
});

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

  const keyExtractor = useCallback((item: DoctorCarouselItem) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: DoctorCarouselItem }) => (
      <DoctorCarouselCard
        doctor={item}
        theme={theme}
        t={t}
        onPress={onDoctorPress}
      />
    ),
    [theme, t, onDoctorPress]
  );

  if (!items || items.length === 0) return null;

  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={true}
      initialNumToRender={3}
      maxToRenderPerBatch={4}
      windowSize={3}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: theme.spacing.md },
      ]}
    />
  );
});

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 4,
    gap: 14,
  },
  card: {
    width: 280,
    borderWidth: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
  },
  infoCol: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  langChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
  },
});

export default DoctorCarouselSection;
