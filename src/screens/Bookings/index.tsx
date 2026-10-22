import React, { useMemo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/context/ThemeContext';
import { useBooking } from '@/context/BookingContext';
import { createBookingsListStyles } from './styles';
import { Booking } from '@/types/booking.types';
import { Badge } from '@/components/common/Badge';
import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Icon } from '@/components/icons/Icon';
import { formatCurrencyInr } from '@/utils/formatters';
import { useTranslation } from 'react-i18next';

export const BookingsScreen: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
  const theme = useAppTheme();
  const styles = useMemo(() => createBookingsListStyles(theme), [theme]);
  const { t } = useTranslation();
  const { bookings, isLoading, refreshBookings, cancelBooking } = useBooking();

  const handleCancel = (booking: Booking) => {
    Alert.alert(
      t('common.cancel_appointment'),
      t('common.cancel_confirm_message', { doctorName: booking.doctorName }),
      [
        { text: t('common.no_keep'), style: 'cancel' },
        {
          text: t('common.yes_cancel'),
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
            <AppText variant="titleMedium" weight="700">
              {item.doctorName}
            </AppText>
            <AppText variant="bodySmall" colorKey="textSecondary" style={{ marginTop: 2 }}>
              {item.specialty}
            </AppText>
          </View>
          <Badge
            label={isPending ? t('booking.syncing') : t('booking.confirmed')}
            variant={isPending ? 'warning' : 'success'}
          />
        </View>

        <View style={styles.dateTimeRow}>
          <Icon name="calendar" size={15} color={theme.colors.primary} />
          <AppText variant="labelLarge" weight="700">
            {item.date} • {item.startsAt}
          </AppText>
        </View>

        <View style={styles.clinicRow}>
          <Icon name="map-pin" size={12} color={theme.colors.textSecondary} />
          <AppText variant="bodySmall" colorKey="textSecondary" numberOfLines={1} style={{ marginLeft: 4 }}>
            {item.clinicName}
          </AppText>
        </View>

        <View style={styles.bottomRow}>
          <AppText variant="titleMedium" weight="800">
            {formatCurrencyInr(item.feeInr)}
          </AppText>
          <TouchableOpacity
            onPress={() => handleCancel(item)}
            style={styles.cancelBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <AppText variant="labelSmall" weight="600" colorKey="error">
              {t('common.cancel')}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        title={t('booking.my_appointments')}
        showBack={false}
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate('DoctorBooking', {})}
            style={{ padding: 4 }}
          >
            <Icon name="calendar-plus" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
        }
      />

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
