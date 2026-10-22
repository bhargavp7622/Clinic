import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { LayoutConfig } from '@/types/config.types';
import { MockApiClient, setRuntimeConfigMode } from '@/api/mockApiClient';
import { NORMAL_LAYOUT_CONFIG } from '@/api/mockData';
import { StorageService } from '@/services/storage.service';

interface ConfigContextType {
  config: LayoutConfig;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  fromCache: boolean;
  activeMode: 'normal' | 'festival';
  switchConfigMode: (mode: 'normal' | 'festival') => Promise<void>;
  refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType>({
  config: NORMAL_LAYOUT_CONFIG,
  isLoading: true,
  isError: false,
  errorMessage: null,
  fromCache: false,
  activeMode: 'normal',
  switchConfigMode: async () => {},
  refreshConfig: async () => {},
});

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<LayoutConfig>(NORMAL_LAYOUT_CONFIG);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'normal' | 'festival'>('normal');

  const fetchConfig = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    try {
      const mode = await StorageService.getActiveConfigMode();
      setActiveMode(mode);
      await setRuntimeConfigMode(mode);

      const result = await MockApiClient.getConfig();
      setConfig(result.config);
      setFromCache(result.fromCache);
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err?.message || 'Failed to fetch layout configuration');

      const cached = await StorageService.getCachedConfig();
      if (cached) {
        setConfig(cached);
        setFromCache(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const switchConfigMode = useCallback(async (mode: 'normal' | 'festival') => {
    setIsLoading(true);
    try {
      await setRuntimeConfigMode(mode);
      setActiveMode(mode);
      const result = await MockApiClient.getConfig();
      setConfig(result.config);
      setFromCache(result.fromCache);
      setIsError(false);
      setErrorMessage(null);
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err?.message || 'Failed to switch configuration');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const value = useMemo(
    () => ({
      config,
      isLoading,
      isError,
      errorMessage,
      fromCache,
      activeMode,
      switchConfigMode,
      refreshConfig: fetchConfig,
    }),
    [config, isLoading, isError, errorMessage, fromCache, activeMode, switchConfigMode, fetchConfig]
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => useContext(ConfigContext);
