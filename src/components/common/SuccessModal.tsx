import React, { useEffect, useRef } from 'react';
import { View, Modal, Animated } from 'react-native';
import { useAppTheme } from '@context';
import { Button } from './Button';
import { AppText } from './AppText';
import { Icon } from '@components';
import { Booking } from '@types';
import { formatCurrencyInr } from '@utils';
import { useTranslation } from 'react-i18next';

interface SuccessModalProps {
  visible: boolean;
  booking: Booking | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = React.memo(({
  visible,
  booking,
  onClose,
}) => {
  const theme = useAppTheme();
  const { t } = useTranslation();
  const scaleAnim = useRef(new Animated.Value(0.4)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 65,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.4);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim]);

  if (!visible || !booking) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.overlay,
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.lg,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            width: '100%',
            maxWidth: 340,
            alignItems: 'center',
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            ...theme.shadows.floating,
          }}
        >
          {/* Animated Celebration Icon */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.badgeBg,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.md,
              borderWidth: 3,
              borderColor: theme.colors.primary,
            }}
          >
            <Icon name="check" size={44} color={theme.colors.primary} strokeWidth={3} />
          </View>

          <AppText
            variant="headlineLarge"
            weight="800"
            align="center"
            style={{ marginBottom: 6 }}
          >
            {t('booking.booking_success')}
          </AppText>

          <AppText
            variant="bodyMedium"
            align="center"
            colorKey="textSecondary"
            style={{ marginBottom: theme.spacing.lg }}
          >
            {t('booking.booking_success_desc')}
          </AppText>

          {/* Details Card */}
          <View
            style={{
              backgroundColor: theme.colors.divider,
              borderRadius: theme.borderRadius.md,
              padding: theme.spacing.md,
              width: '100%',
              marginBottom: theme.spacing.lg,
              gap: 8,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AppText variant="bodySmall" colorKey="textSecondary">
                {t('booking.doctor')}
              </AppText>
              <AppText variant="bodySmall" weight="700">
                {booking.doctorName}
              </AppText>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AppText variant="bodySmall" colorKey="textSecondary">
                {t('booking.date_and_slot')}
              </AppText>
              <AppText variant="bodySmall" weight="700" colorKey="primary">
                {booking.date} • {booking.startsAt}
              </AppText>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AppText variant="bodySmall" colorKey="textSecondary">
                {t('booking.consultation_fee')}
              </AppText>
              <AppText variant="bodySmall" weight="700">
                {formatCurrencyInr(booking.feeInr)}
              </AppText>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AppText variant="bodySmall" colorKey="textSecondary">
                {t('booking.clinic_location')}
              </AppText>
              <AppText
                variant="bodySmall"
                weight="600"
                numberOfLines={1}
                style={{ flex: 1, textAlign: 'right', marginLeft: 8 }}
              >
                {booking.clinicName}
              </AppText>
            </View>
          </View>

          <Button
            title={t('booking.done_view')}
            onPress={onClose}
            variant="primary"
            style={{ width: '100%' }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
});
