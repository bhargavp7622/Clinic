import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConfigProvider, useConfig } from './src/context/ConfigContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { NetworkProvider } from './src/context/NetworkContext';
import { BookingProvider } from './src/context/BookingContext';
import { PrescriptionProvider } from './src/context/PrescriptionContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { initI18n } from './src/i18n';
import { initApiClient } from './src/api/mockApiClient';

// Inner component that extracts theme dynamically from remote config
const AppWithTheme: React.FC = () => {
  const { config, activeMode } = useConfig();

  return (
    <ThemeProvider layoutTheme={config.theme} isFestival={activeMode === 'festival'}>
      <NetworkProvider>
        <BookingProvider>
          <PrescriptionProvider>
            <RootNavigator />
          </PrescriptionProvider>
        </BookingProvider>
      </NetworkProvider>
    </ThemeProvider>
  );
};

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await Promise.all([initI18n(), initApiClient()]);
      } catch (e) {
        console.warn('Initialization error', e);
      } finally {
        setIsReady(true);
      }
    };

    prepareApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
        <ActivityIndicator size="large" color="#0F766E" />
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
