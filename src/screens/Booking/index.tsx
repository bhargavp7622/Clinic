import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { createBookingStyles } from './styles';
import { Doctor } from '../../types/doctor.types';
import { Slot, Booking } from '../../types/booking.types';
import { MockApiClient } from '../../api/mockApiClient';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { BottomSheet } from '../../components/common/BottomSheet';
import { SuccessModal } from '../../components/common/SuccessModal';
import { EmptyState } from '../../components/common/EmptyState';
import { DoctorCardSkeleton } from '../../components/common/Skeleton';
import { Icon } from '../../components/icons/Icon';
import { formatCurrencyInr, getNextDays } from '../../utils/formatters';
import { triggerHaptic } from '../../utils/haptics';
import { useTranslation } from 'react-i18next';

export const BookingScreen: React.FC = React.memo(() => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const styles = useMemo(() => createBookingStyles(theme), [theme]);
  const { t } = useTranslation();
  const { createBooking, isBookingInProgress } = useBooking();

  // Route preselected parameters
  const preselectedDoctorId = route.params?.doctorId;
  const preselectedQuery = route.params?.preselectedQuery || '';

  // Local state
  const [searchQuery, setSearchQuery] = useState<string>(preselectedQuery);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState<boolean>(true);
  const [errorDoctors, setErrorDoctors] = useState<string | null>(null);

  // Date selection state
  const dateOptions = useMemo(() => getNextDays(7), []);
  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0].dateStr);

  // BottomSheet Slot state
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isSheetVisible, setIsSheetVisible] = useState<boolean>(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);

  // Success Modal
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);

  // Fetch doctors
  const fetchDoctors = useCallback(async (query: string) => {
    setIsLoadingDoctors(true);
    setErrorDoctors(null);
    try {
      const res = await MockApiClient.getDoctors({ search: query });
      setDoctors(res.doctors);
    } catch (err: any) {
      setErrorDoctors(err?.message || 'Failed to fetch doctors');
    } finally {
      setIsLoadingDoctors(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors(searchQuery);
  }, [searchQuery, fetchDoctors]);

  // Open slot picker for doctor
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

  // Re-fetch slots if date changes while sheet is open
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

  // Check if doctor was passed directly in route params and open slot sheet
  useEffect(() => {
    if (preselectedDoctorId && doctors.length > 0 && !selectedDoctor) {
      const match = doctors.find(d => d.id === preselectedDoctorId);
      if (match) {
        handleOpenSlots(match);
      }
    }
  }, [preselectedDoctorId, doctors, selectedDoctor, handleOpenSlots]);

  // Handle slot booking confirmation (Instant Optimistic Update)
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
      // Slot conflict (409) or error
      setSlotError(res.error || t('booking.slot_conflict_error'));
    }
  }, [selectedDoctor, selectedSlot, selectedDate, createBooking, t]);

  const morningSlots = useMemo(() => {
    return slots.filter(s => s.startsAt.includes('AM'));
  }, [slots]);

  const eveningSlots = useMemo(() => {
    return slots.filter(s => s.startsAt.includes('PM'));
  }, [slots]);

  const renderDoctorItem = ({ item }: { item: Doctor }) => {
    return (
      <View style={styles.doctorCard}>
        <View style={styles.docHeaderRow}>
          <Image
            source={{ uri: item.photoUrl }}
            style={[styles.docAvatar, { borderColor: theme.colors.border }]}
            resizeMode="cover"
          />
          <View style={styles.docInfo}>
            <Text style={styles.docName}>{item.name}</Text>
            <Text style={styles.docSpecialty}>{item.specialty}</Text>
            <View style={styles.docMetaRow}>
              <View style={styles.metaItem}>
                <Icon name="star" size={13} color="#F59E0B" />
                <Text style={styles.metaText}>{item.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.metaText}>•</Text>
              <View style={styles.metaItem}>
                <Icon name="activity" size={12} color={theme.colors.textSecondary} />
                <Text style={styles.metaText}>{item.experienceYears} yrs {t('common.experience')}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.clinicRow}>
          <Icon name="map-pin" size={13} color={theme.colors.textSecondary} />
          <Text style={styles.clinicText} numberOfLines={1}>
            {item.clinicLocation}
          </Text>
        </View>

        <View style={styles.docFooter}>
          <View>
            <Text style={styles.feeLabel}>{t('common.consultation_fee')}</Text>
            <Text style={styles.feeAmount}>{formatCurrencyInr(item.feeInr)}</Text>
          </View>

          <Button
            title={t('common.book_now')}
            onPress={() => handleOpenSlots(item)}
            variant="primary"
            icon={<Icon name="calendar-plus" size={15} color="#FFFFFF" />}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ padding: 4 }}
        >
          <Icon name="chevron-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('booking.title')}</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Debounced Search */}
      <View style={styles.searchWrapper}>
        <SearchBar
          initialValue={searchQuery}
          placeholder={t('common.search_placeholder')}
          onSearchChange={setSearchQuery}
        />
      </View>

      {/* Interactive Date Selection Strip */}
      <View style={styles.dateStripContainer}>
        <Text style={styles.dateStripLabel}>{t('booking.select_date')}</Text>
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
                <Text
                  style={[
                    styles.dateDayName,
                    { color: isSelected ? '#FFFFFF' : theme.colors.textSecondary },
                  ]}
                >
                  {item.dayName}
                </Text>
                <Text
                  style={[
                    styles.dateDayNumber,
                    { color: isSelected ? '#FFFFFF' : theme.colors.textPrimary },
                  ]}
                >
                  {item.dayNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Doctors List */}
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
          title="No Doctors Found"
          description="Try searching with a different specialty, clinic, or doctor name."
          actionTitle="Reset Search"
          onActionPress={() => setSearchQuery('')}
        />
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={item => item.id}
          renderItem={renderDoctorItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Gesture-driven PanResponder BottomSheet for Slot Selection */}
      <BottomSheet visible={isSheetVisible} onClose={() => setIsSheetVisible(false)}>
        {selectedDoctor ? (
          <View>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{selectedDoctor.name}</Text>
              <Text style={styles.sheetSubtitle}>
                {selectedDoctor.specialty} • {selectedDate}
              </Text>
            </View>

            <ScrollView style={styles.sheetBody}>
              {isLoadingSlots ? (
                <View style={{ padding: 24, alignItems: 'center' }}>
                  <ActivityIndicator size="large" color={theme.colors.primary} />
                  <Text style={{ marginTop: 8, color: theme.colors.textSecondary }}>
                    Loading available slots...
                  </Text>
                </View>
              ) : slots.length === 0 ? (
                <EmptyState
                  iconName="clock"
                  title="No Slots"
                  description={t('booking.no_slots_found')}
                />
              ) : (
                <>
                  {/* Morning Slots */}
                  {morningSlots.length > 0 ? (
                    <>
                      <Text style={styles.slotSectionTitle}>{t('booking.morning_slots')}</Text>
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
                              <Text
                                style={[
                                  styles.slotText,
                                  {
                                    color: !slot.available
                                      ? theme.colors.textSecondary
                                      : isSelected
                                      ? '#FFFFFF'
                                      : theme.colors.textPrimary,
                                  },
                                ]}
                              >
                                {slot.startsAt}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </>
                  ) : null}

                  {/* Evening Slots */}
                  {eveningSlots.length > 0 ? (
                    <>
                      <Text style={styles.slotSectionTitle}>{t('booking.evening_slots')}</Text>
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
                              <Text
                                style={[
                                  styles.slotText,
                                  {
                                    color: !slot.available
                                      ? theme.colors.textSecondary
                                      : isSelected
                                      ? '#FFFFFF'
                                      : theme.colors.textPrimary,
                                  },
                                ]}
                              >
                                {slot.startsAt}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </>
                  ) : null}

                  {slotError ? <Text style={styles.errorText}>{slotError}</Text> : null}
                </>
              )}
            </ScrollView>

            <View style={styles.sheetFooter}>
              <Button
                title={
                  selectedSlot
                    ? `${t('booking.confirm_booking')} (${selectedSlot.startsAt})`
                    : 'Select a Slot to Continue'
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

      {/* Success Modal */}
      <SuccessModal
        visible={isSuccessModalVisible}
        booking={confirmedBooking}
        onClose={() => {
          setIsSuccessModalVisible(false);
          navigation.navigate('MainTabs', { screen: 'BookingsTab' });
        }}
      />
    </SafeAreaView>
  );
});

export default BookingScreen;
