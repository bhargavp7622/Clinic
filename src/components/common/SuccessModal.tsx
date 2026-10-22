import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../context/ThemeContext';
import { Button } from './Button';
import { Icon } from '../icons/Icon';
import { Booking } from '../../types/booking.types';
import { formatCurrencyInr } from '../../utils/formatters';

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
              backgroundColor: '#DCFCE7',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.md,
              borderWidth: 4,
              borderColor: '#86EFAC',
            }}
          >
            <Icon name="check" size={44} color="#15803D" strokeWidth={3} />
          </View>

          <Text
            style={{
              fontSize: theme.typography.headlineLarge.fontSize,
              fontWeight: '800',
              color: theme.colors.textPrimary,
              textAlign: 'center',
              marginBottom: 6,
            }}
          >
            Booking Confirmed!
          </Text>

          <Text
            style={{
              fontSize: theme.typography.bodyMedium.fontSize,
              color: theme.colors.textSecondary,
              textAlign: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            Instant confirmation sent to WhatsApp
          </Text>

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
              <Text style={{ fontSize: 13, color: theme.colors.textSecondary }}>Doctor</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.textPrimary }}>
                {booking.doctorName}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 13, color: theme.colors.textSecondary }}>Date & Slot</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.primary }}>
                {booking.date} • {booking.startsAt}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 13, color: theme.colors.textSecondary }}>Consultation Fee</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: theme.colors.textPrimary }}>
                {formatCurrencyInr(booking.feeInr)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 13, color: theme.colors.textSecondary }}>Clinic Location</Text>
              <Text
                style={{ fontSize: 12, fontWeight: '600', color: theme.colors.textPrimary, flex: 1, textAlign: 'right', marginLeft: 8 }}
                numberOfLines={1}
              >
                {booking.clinicName}
              </Text>
            </View>
          </View>

          <Button
            title="Done & View Appointment"
            onPress={onClose}
            variant="primary"
            style={{ width: '100%' }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
});
