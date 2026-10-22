import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@types';
import { HomeScreen, BookingsScreen, PrescriptionsScreen, ProfileScreen } from '@screens';
import { useAppTheme, useConfig } from '@context';
import { Icon } from '@components';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  const theme = useAppTheme();
  const { config } = useConfig();
  const { t } = useTranslation();

  const getTabLabel = (screenName: string, defaultKey: string) => {
    const found = config.tabs?.find(tItem => tItem.screen === screenName);
    const labelKey = found?.label || defaultKey;
    return t(labelKey, { defaultValue: labelKey });
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
          tabBarLabel: getTabLabel('home', 'tabs.home'),
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={22} />,
        }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          tabBarLabel: getTabLabel('bookings', 'tabs.appointments'),
          tabBarIcon: ({ color }) => <Icon name="calendar" color={color} size={22} />,
        }}
      />
      <Tab.Screen
        name="PrescriptionsTab"
        component={PrescriptionsScreen}
        options={{
          tabBarLabel: getTabLabel('prescriptions', 'tabs.prescriptions'),
          tabBarIcon: ({ color }) => <Icon name="file-text" color={color} size={22} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: getTabLabel('profile', 'tabs.profile'),
          tabBarIcon: ({ color }) => <Icon name="user" color={color} size={22} />,
        }}
      />
    </Tab.Navigator>
  );
};
