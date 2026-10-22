import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Config from 'react-native-config';
import { RootStackParamList } from '@types';
import { BookingScreen, PrescriptionDetailScreen, AdminConfigScreen } from '@screens';
import { useAppTheme } from '@context';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const DEEP_LINK_SCHEME = Config.DEEP_LINK_SCHEME || '';
const WEB_DOMAIN = Config.WEB_DOMAIN || '';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [DEEP_LINK_SCHEME, WEB_DOMAIN],
  config: {
    screens: {
      MainTabs: {
        screens: {
          HomeTab: 'home',
          BookingsTab: 'bookings',
          PrescriptionsTab: 'prescriptions',
          ProfileTab: 'profile',
        },
      },
      DoctorBooking: 'doctor/:doctorId',
      PrescriptionDetail: 'prescription/:prescriptionId',
      AdminConfig: 'admin',
    },
  },
};

export const RootNavigator: React.FC = () => {
  const theme = useAppTheme();

  return (
    <NavigationContainer
      linking={linking}
      theme={{
        dark: false,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.textPrimary,
          border: theme.colors.border,
          notification: theme.colors.notification,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '800' },
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="DoctorBooking"
          component={BookingScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="PrescriptionDetail" component={PrescriptionDetailScreen} />
        <Stack.Screen
          name="AdminConfig"
          component={AdminConfigScreen}
          options={{
            animation: 'slide_from_bottom',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
