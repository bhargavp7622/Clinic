import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation.types';
import { HomeScreen } from '../screens/Home';
import { BookingsScreen } from '../screens/Bookings';
import { PrescriptionsScreen } from '../screens/Prescriptions';
import { ProfileScreen } from '../screens/Profile';
import { useAppTheme } from '../context/ThemeContext';
import { useConfig } from '../context/ConfigContext';
import { Icon } from '../components/icons/Icon';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  const theme = useAppTheme();
  const { config } = useConfig();

  // Find labels from config tabs if present
  const getTabLabel = (screenName: string, defaultLabel: string) => {
    const found = config.tabs?.find(t => t.screen === screenName);
    return found?.label || defaultLabel;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 86 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          ...theme.shadows.card,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: getTabLabel('home', 'Home'),
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={22} />,
        }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          tabBarLabel: getTabLabel('bookings', 'Appointments'),
          tabBarIcon: ({ color, size }) => <Icon name="calendar" color={color} size={22} />,
        }}
      />
      <Tab.Screen
        name="PrescriptionsTab"
        component={PrescriptionsScreen}
        options={{
          tabBarLabel: getTabLabel('prescriptions', 'Prescriptions'),
          tabBarIcon: ({ color, size }) => <Icon name="file-text" color={color} size={22} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: getTabLabel('profile', 'Profile'),
          tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={22} />,
        }}
      />
    </Tab.Navigator>
  );
};
