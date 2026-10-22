import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ConfigProvider,
  useConfig,
  ThemeProvider,
  useAppTheme,
  NetworkProvider,
  BookingProvider,
  PrescriptionProvider,
} from '@context';
import { RootNavigator } from '@/navigation/RootNavigator';
import { initI18n } from '@/i18n';
import { initApiClient } from '@api';

const ThemedAppContent: React.FC = () => {
  const theme = useAppTheme();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.(theme.colors.surface, true);
    }
  }, [theme]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NetworkProvider>
        <BookingProvider>
          <PrescriptionProvider>
            <RootNavigator />
          </PrescriptionProvider>
        </BookingProvider>
      </NetworkProvider>
    </>
  );
};

const AppWithTheme: React.FC = () => {
  const { config, activeMode } = useConfig();

  return (
    <ThemeProvider layoutTheme={config.theme} isFestival={activeMode === 'festival'}>
      <ThemedAppContent />
    </ThemeProvider>
  );
};

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await Promise.all([initI18n(), initApiClient()]);
      } catch {} finally {
        setIsReady(true);
      }
    };

    prepareApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ConfigProvider>
        <AppWithTheme />
      </ConfigProvider>
    </SafeAreaProvider>
  );
};

export default App;
