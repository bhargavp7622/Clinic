/* eslint-disable no-undef */
import React from 'react';

const storageCache: Record<string, string> = {};

const mockAsyncStorage = {
  setItem: jest.fn((key: string, value: string) => {
    storageCache[key] = value;
    return Promise.resolve(null);
  }),
  getItem: jest.fn((key: string) => {
    return Promise.resolve(storageCache[key] || null);
  }),
  removeItem: jest.fn((key: string) => {
    delete storageCache[key];
    return Promise.resolve(null);
  }),
  clear: jest.fn(() => {
    Object.keys(storageCache).forEach(k => delete storageCache[k]);
    return Promise.resolve(null);
  }),
  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(storageCache))),
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true, isInternetReachable: true })),
}));

const mockInset = { top: 0, right: 0, bottom: 0, left: 0 };
const mockFrame = { x: 0, y: 0, width: 390, height: 844 };

const mockSafeAreaInsetsContext = React.createContext(mockInset);
const mockSafeAreaFrameContext = React.createContext(mockFrame);

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaConsumer: ({ children }: any) => children(mockInset),
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => mockInset,
  useSafeAreaFrame: () => mockFrame,
  SafeAreaInsetsContext: mockSafeAreaInsetsContext,
  SafeAreaFrameContext: mockSafeAreaFrameContext,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => Promise.resolve(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

