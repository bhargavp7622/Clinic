import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { createBookingsListStyles } from './styles';
import { Booking } from '../../types/booking.types';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { Icon } from '../../components/icons/Icon';
import { formatCurrencyInr } from '../../utils/formatters';
import { useTranslation } from 'react-i18next';

export const BookingsScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const styles = useMemo(() => createBookingsListStyles(theme), [theme]);
  const { t } = useTranslation();
  const { bookings, isLoading, refreshBookings, cancelBooking } = useBooking();

  const handleCancel = (booking: Booking) => {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel appointment with ${booking.doctorName}?`,
      [
        { text: 'No, Keep it', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => cancelBooking(booking.id),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Booking }) => {
    const isPending = item.status === 'pending' || item.isOptimistic;

    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.doctorName}>{item.doctorName}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
          </View>
          <Badge
            label={isPending ? 'Syncing...' : 'Confirmed'}
            variant={isPending ? 'warning' : 'success'}
          />
        </View>

        <View style={styles.dateTimeRow}>
          <Icon name="calendar" size={15} color={theme.colors.primary} />
          <Text style={styles.dateTimeText}>
            {item.date} • {item.startsAt}
          </Text>
        </View>

        <View style={styles.clinicRow}>
          <Icon name="map-pin" size={12} color={theme.colors.textSecondary} />
          <Text style={styles.clinicText} numberOfLines={1}>
            {item.clinicName}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.feeText}>{formatCurrencyInr(item.feeInr)}</Text>
          <TouchableOpacity
            onPress={() => handleCancel(item)}
            style={styles.cancelBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('booking.my_appointments')}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DoctorBooking', {})}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
        >
          <Icon name="calendar-plus" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <EmptyState
          iconName="calendar"
          title={t('booking.no_bookings')}
          description={t('booking.book_first')}
          actionTitle={t('common.book_now')}
          onActionPress={() => navigation.navigate('DoctorBooking', {})}
        />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refreshBookings}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
});

export default BookingsScreen;
