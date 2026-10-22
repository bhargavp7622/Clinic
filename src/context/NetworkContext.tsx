import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  DevSettings,
  DEFAULT_DEV_SETTINGS,
  StorageService,
} from '@/services/storage.service';
import { updateApiClientDevSettings } from '@/api/mockApiClient';

interface NetworkContextType {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  isSimulatedFailure: boolean;
  isEffectiveOffline: boolean;
  devSettings: DevSettings;
  setSimulatedLatency: (ms: number) => Promise<void>;
  toggleForceFailure: () => Promise<void>;
  toggleSlotConflict: () => Promise<void>;
  resetDevSettings: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
  isInternetReachable: true,
  isSimulatedFailure: false,
  isEffectiveOffline: false,
  devSettings: DEFAULT_DEV_SETTINGS,
  setSimulatedLatency: async () => {},
  toggleForceFailure: async () => {},
  toggleSlotConflict: async () => {},
  resetDevSettings: async () => {},
});

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(true);
  const [devSettings, setDevSettings] = useState<DevSettings>(DEFAULT_DEV_SETTINGS);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true);
      setIsInternetReachable(state.isInternetReachable);
    });

    StorageService.getDevSettings().then(settings => {
      setDevSettings(settings);
      updateApiClientDevSettings(settings);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const setSimulatedLatency = useCallback(async (ms: number) => {
    const updated = { ...devSettings, simulatedLatencyMs: ms };
    setDevSettings(updated);
    await updateApiClientDevSettings(updated);
  }, [devSettings]);

  const toggleForceFailure = useCallback(async () => {
    const updated = { ...devSettings, forceFailure: !devSettings.forceFailure };
    setDevSettings(updated);
    await updateApiClientDevSettings(updated);
  }, [devSettings]);

  const toggleSlotConflict = useCallback(async () => {
    const updated = { ...devSettings, simulateSlotConflict: !devSettings.simulateSlotConflict };
    setDevSettings(updated);
    await updateApiClientDevSettings(updated);
  }, [devSettings]);

  const resetDevSettings = useCallback(async () => {
    setDevSettings(DEFAULT_DEV_SETTINGS);
    await updateApiClientDevSettings(DEFAULT_DEV_SETTINGS);
  }, []);

  const isEffectiveOffline = useMemo(() => {
    return !isConnected || devSettings.forceFailure;
  }, [isConnected, devSettings.forceFailure]);

  const value = useMemo(
    () => ({
      isConnected,
      isInternetReachable,
      isSimulatedFailure: devSettings.forceFailure,
      isEffectiveOffline,
      devSettings,
      setSimulatedLatency,
      toggleForceFailure,
      toggleSlotConflict,
      resetDevSettings,
    }),
    [
      isConnected,
      isInternetReachable,
      devSettings,
      isEffectiveOffline,
      setSimulatedLatency,
      toggleForceFailure,
      toggleSlotConflict,
      resetDevSettings,
    ]
  );

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
};

export const useNetwork = () => useContext(NetworkContext);
