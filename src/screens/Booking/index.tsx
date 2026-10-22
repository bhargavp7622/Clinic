import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useAppTheme, useBooking } from '@context';
import {
  AppText,
  AppHeader,
  Button,
  SearchBar,
  BottomSheet,
  SuccessModal,
  EmptyState,
  DoctorCardSkeleton,
} from '@common';
import { Icon } from '@components';
import { MockApiClient } from '@api';
import { Doctor, Slot, Booking } from '@types';
import { formatCurrencyInr, getNextDays, triggerHaptic } from '@utils';
import { useTranslation } from 'react-i18next';
import { createBookingStyles } from './styles';

interface DoctorCardItemProps {
  item: Doctor;
  theme: any;
  styles: any;
  t: (key: string) => string;
  onBook: (doctor: Doctor) => void;
}

const DoctorCardItem: React.FC<DoctorCardItemProps> = React.memo(({
  item,
  theme,
  styles,
  t,
  onBook,
}) => {
  return (
    <View style={styles.doctorCard}>
      <View style={styles.docHeaderRow}>
        <Image
          source={{ uri: item.photoUrl }}
          style={[styles.docAvatar, { borderColor: theme.colors.border }]}
          resizeMode="cover"
        />
        <View style={styles.docInfo}>
          <AppText variant="titleMedium" weight="700">
            {item.name}
          </AppText>
          <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
            {item.specialty}
          </AppText>
          <View style={styles.docMetaRow}>
            <View style={styles.metaItem}>
              <Icon name="star" size={13} color={theme.colors.warning} />
              <AppText variant="labelSmall" weight="700" colorKey="warning">
                {item.rating.toFixed(1)}
              </AppText>
            </View>
            <AppText variant="labelSmall" colorKey="textSecondary">•</AppText>
            <View style={styles.metaItem}>
              <Icon name="activity" size={12} color={theme.colors.textSecondary} />
              <AppText variant="labelSmall" colorKey="textSecondary">
                {item.experienceYears} yrs {t('common.experience')}
              </AppText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.clinicRow}>
        <Icon name="map-pin" size={13} color={theme.colors.textSecondary} />
        <AppText variant="bodySmall" colorKey="textSecondary" numberOfLines={1} style={{ flex: 1, marginLeft: 4 }}>
          {item.clinicLocation}
        </AppText>
      </View>

      <View style={styles.docFooter}>
        <View>
          <AppText variant="labelSmall" colorKey="textSecondary">
            {t('common.fee')}
          </AppText>
          <AppText variant="titleLarge" weight="800">
            {formatCurrencyInr(item.feeInr)}
          </AppText>
        </View>

        <Button
          title={t('common.book_now')}
          onPress={() => onBook(item)}
          variant="primary"
          icon={<Icon name="calendar-plus" size={15} color={theme.colors.surface} />}
        />
      </View>
    </View>
  );
});

export const BookingScreen: React.FC = React.memo(() => {
  const route = useRoute<any>();
  const theme = useAppTheme();
  const styles = useMemo(() => createBookingStyles(theme), [theme]);
  const { t } = useTranslation();
  const { createBooking, isBookingInProgress } = useBooking();

  const preselectedDoctorId = route.params?.doctorId;
  const preselectedQuery = route.params?.preselectedQuery || '';

  const [searchQuery, setSearchQuery] = useState<string>(preselectedQuery);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 4;
  const [isLoadingDoctors, setIsLoadingDoctors] = useState<boolean>(true);
  const [errorDoctors, setErrorDoctors] = useState<string | null>(null);

  const dateOptions = useMemo(() => getNextDays(7), []);
  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0].dateStr);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isSheetVisible, setIsSheetVisible] = useState<boolean>(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);

  const fetchDoctors = useCallback(async (query: string) => {
    setIsLoadingDoctors(true);
    setErrorDoctors(null);
    try {
      const res = await MockApiClient.getDoctors({ search: query });
      setDoctors(res.doctors);
      setPage(1);
    } catch (err: any) {
      setErrorDoctors(err?.message || 'Failed to fetch doctors');
    } finally {
      setIsLoadingDoctors(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors(searchQuery);
  }, [searchQuery, fetchDoctors]);

  const paginatedDoctors = useMemo(() => {
    return doctors.slice(0, page * pageSize);
  }, [doctors, page, pageSize]);

  const handleLoadMore = useCallback(() => {
    if (page * pageSize < doctors.length) {
      setPage(p => p + 1);
    }
  }, [page, pageSize, doctors.length]);

  const handleOpenSlots = useCallback(
    async (doctor: Doctor) => {
      setSelectedDoctor(doctor);
      setSelectedSlot(null);
      setSlotError(null);
      setIsSheetVisible(true);
      setIsLoadingSlots(true);
      triggerHaptic('light');

      try {
        const availableSlots = await MockApiClient.getSlots(doctor.id, selectedDate);
        setSlots(availableSlots);
      } catch (err: any) {
        setSlotError(err?.message || 'Failed to load slots');
      } finally {
        setIsLoadingSlots(false);
      }
    },
    [selectedDate]
  );

  const handleSelectDate = useCallback(
    async (dateStr: string) => {
      setSelectedDate(dateStr);
      triggerHaptic('light');
      if (selectedDoctor) {
        setIsLoadingSlots(true);
        setSelectedSlot(null);
        try {
          const availableSlots = await MockApiClient.getSlots(selectedDoctor.id, dateStr);
          setSlots(availableSlots);
        } catch (err: any) {
          setSlotError(err?.message || 'Failed to load slots');
        } finally {
          setIsLoadingSlots(false);
        }
      }
    },
    [selectedDoctor]
  );

  useEffect(() => {
    if (preselectedDoctorId && doctors.length > 0 && !selectedDoctor) {
      const match = doctors.find(d => d.id === preselectedDoctorId);
      if (match) {
        handleOpenSlots(match);
      }
    }
  }, [preselectedDoctorId, doctors, selectedDoctor, handleOpenSlots]);

  const handleConfirmBooking = useCallback(async () => {
    if (!selectedDoctor || !selectedSlot) return;

    setSlotError(null);

    const payload = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      feeInr: selectedDoctor.feeInr,
      clinicName: selectedDoctor.clinicName,
      slotId: selectedSlot.id,
      date: selectedDate,
      startsAt: selectedSlot.startsAt,
      endsAt: selectedSlot.endsAt,
    };

    const res = await createBooking(payload);

    if (res.success && res.booking) {
      setIsSheetVisible(false);
      setConfirmedBooking(res.booking);
      setIsSuccessModalVisible(true);
    } else {
      setSlotError(res.error || t('booking.slot_conflict_error'));
    }
  }, [selectedDoctor, selectedSlot, selectedDate, createBooking, t]);

  const morningSlots = useMemo(() => {
    return slots.filter(s => s.startsAt.includes('AM'));
  }, [slots]);

  const eveningSlots = useMemo(() => {
    return slots.filter(s => s.startsAt.includes('PM'));
  }, [slots]);

  const keyExtractor = useCallback((item: Doctor) => item.id, []);

  const renderDoctorItem = useCallback(
    ({ item }: { item: Doctor }) => (
      <DoctorCardItem
        item={item}
        theme={theme}
        styles={styles}
        t={t}
        onBook={handleOpenSlots}
      />
    ),
    [theme, styles, t, handleOpenSlots]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader title={t('booking.title')} />

      <View style={styles.searchWrapper}>
        <SearchBar
          initialValue={searchQuery}
          placeholder={t('common.search_placeholder')}
          onSearchChange={setSearchQuery}
        />
      </View>

      <View style={styles.dateStripContainer}>
        <AppText variant="labelSmall" colorKey="textSecondary" style={{ paddingHorizontal: theme.spacing.md, marginBottom: 8 }}>
          {t('booking.select_date')}
        </AppText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateScroll}
        >
          {dateOptions.map(item => {
            const isSelected = selectedDate === item.dateStr;
            return (
              <TouchableOpacity
                key={item.dateStr}
                activeOpacity={0.8}
                onPress={() => handleSelectDate(item.dateStr)}
                style={[
                  styles.dateCard,
                  {
                    backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                    borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    ...theme.shadows.subtle,
                  },
                ]}
              >
                <AppText
                  variant="labelSmall"
                  weight="600"
                  color={isSelected ? theme.colors.surface : theme.colors.textSecondary}
                  style={{ marginBottom: 4 }}
                >
                  {item.dayName}
                </AppText>
                <AppText
                  variant="titleLarge"
                  weight="800"
                  color={isSelected ? theme.colors.surface : theme.colors.textPrimary}
                >
                  {item.dayNumber}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {isLoadingDoctors ? (
        <View style={{ padding: 16, gap: 14 }}>
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
        </View>
      ) : errorDoctors ? (
        <EmptyState
          iconName="alert-triangle"
          title={t('common.error')}
          description={errorDoctors}
          actionTitle={t('common.retry')}
          onActionPress={() => fetchDoctors(searchQuery)}
        />
      ) : doctors.length === 0 ? (
        <EmptyState
          iconName="search"
          title={t('booking.no_doctors_found')}
          description={t('booking.no_doctors_desc')}
          actionTitle={t('booking.reset_search')}
          onActionPress={() => setSearchQuery('')}
        />
      ) : (
        <FlatList
          data={paginatedDoctors}
          keyExtractor={keyExtractor}
          renderItem={renderDoctorItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          maxToRenderPerBatch={6}
          windowSize={5}
          initialNumToRender={4}
          updateCellsBatchingPeriod={50}
        />
      )}

      <BottomSheet visible={isSheetVisible} onClose={() => setIsSheetVisible(false)}>
        {selectedDoctor ? (
          <View>
            <View style={styles.sheetHeader}>
              <AppText variant="headlineMedium" weight="700">
                {selectedDoctor.name}
              </AppText>
              <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
                {selectedDoctor.specialty} • {selectedDate}
              </AppText>
            </View>

            <ScrollView style={styles.sheetBody}>
              {isLoadingSlots ? (
                <View style={{ padding: 24, alignItems: 'center' }}>
                  <ActivityIndicator size="large" color={theme.colors.primary} />
                  <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 8 }}>
                    {t('booking.loading_slots')}
                  </AppText>
                </View>
              ) : slots.length === 0 ? (
                <EmptyState
                  iconName="clock"
                  title="No Slots"
                  description={t('booking.no_slots_found')}
                />
              ) : (
                <>
                  {morningSlots.length > 0 ? (
                    <>
                      <AppText variant="titleMedium" weight="700" style={{ marginBottom: 10, marginTop: 6 }}>
                        {t('booking.morning_slots')}
                      </AppText>
                      <View style={styles.slotGrid}>
                        {morningSlots.map(slot => {
                          const isSelected = selectedSlot?.id === slot.id;
                          return (
                            <TouchableOpacity
                              key={slot.id}
                              disabled={!slot.available}
                              onPress={() => {
                                triggerHaptic('light');
                                setSelectedSlot(slot);
                                setSlotError(null);
                              }}
                              style={[
                                styles.slotPill,
                                {
                                  backgroundColor: !slot.available
                                    ? theme.colors.divider
                                    : isSelected
                                    ? theme.colors.primary
                                    : theme.colors.surface,
                                  borderColor: isSelected
                                    ? theme.colors.primary
                                    : theme.colors.border,
                                  opacity: slot.available ? 1 : 0.45,
                                },
                              ]}
                            >
                              <AppText
                                variant="labelLarge"
                                weight="700"
                                color={
                                  !slot.available
                                    ? theme.colors.textSecondary
                                    : isSelected
                                    ? theme.colors.surface
                                    : theme.colors.textPrimary
                                }
                              >
                                {slot.startsAt}
                              </AppText>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </>
                  ) : null}

                  {eveningSlots.length > 0 ? (
                    <>
                      <AppText variant="titleMedium" weight="700" style={{ marginBottom: 10, marginTop: 6 }}>
                        {t('booking.evening_slots')}
                      </AppText>
                      <View style={styles.slotGrid}>
                        {eveningSlots.map(slot => {
                          const isSelected = selectedSlot?.id === slot.id;
                          return (
                            <TouchableOpacity
                              key={slot.id}
                              disabled={!slot.available}
                              onPress={() => {
                                triggerHaptic('light');
                                setSelectedSlot(slot);
                                setSlotError(null);
                              }}
                              style={[
                                styles.slotPill,
                                {
                                  backgroundColor: !slot.available
                                    ? theme.colors.divider
                                    : isSelected
                                    ? theme.colors.primary
                                    : theme.colors.surface,
                                  borderColor: isSelected
                                    ? theme.colors.primary
                                    : theme.colors.border,
                                  opacity: slot.available ? 1 : 0.45,
                                },
                              ]}
                            >
                              <AppText
                                variant="labelLarge"
                                weight="700"
                                color={
                                  !slot.available
                                    ? theme.colors.textSecondary
                                    : isSelected
                                    ? theme.colors.surface
                                    : theme.colors.textPrimary
                                }
                              >
                                {slot.startsAt}
                              </AppText>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </>
                  ) : null}

                  {slotError ? (
                    <AppText variant="bodySmall" weight="600" colorKey="error" align="center" style={{ marginTop: 8 }}>
                      {slotError}
                    </AppText>
                  ) : null}
                </>
              )}
            </ScrollView>

            <View style={styles.sheetFooter}>
              <Button
                title={
                  selectedSlot
                    ? `${t('booking.confirm_booking')} (${selectedSlot.startsAt})`
                    : t('booking.select_slot_continue')
                }
                onPress={handleConfirmBooking}
                disabled={!selectedSlot || isBookingInProgress}
                loading={isBookingInProgress}
                variant="primary"
                style={{ width: '100%' }}
              />
            </View>
          </View>
        ) : null}
      </BottomSheet>

      <SuccessModal
        visible={isSuccessModalVisible}
        booking={confirmedBooking}
        onClose={() => setIsSuccessModalVisible(false)}
      />
    </SafeAreaView>
  );
});

export default BookingScreen;
