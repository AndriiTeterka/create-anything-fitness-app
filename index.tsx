// Avoid deep import: make sure ExceptionsManager exists before attempting to override in dev
if (__DEV__) {
  const maybeExceptionsManager: any = (globalThis as any)?.ExceptionsManager;
  if (
    maybeExceptionsManager &&
    typeof maybeExceptionsManager.handleException === 'function'
  ) {
    maybeExceptionsManager.handleException = (_error: unknown, _isFatal?: boolean) => {
      // no-op in dev to reduce noise
    };
  }
}

import 'react-native-url-polyfill/auto';
import './src/__create/polyfills';
global.Buffer = require('buffer').Buffer;

import 'expo-router/entry';
import { SplashScreen } from 'expo-router';
import { App } from 'expo-router/build/qualified-entry';
import { type ReactNode, memo, useEffect } from 'react';
import { AppRegistry, LogBox, SafeAreaView, Text, View } from 'react-native';
import { serializeError } from 'serialize-error';
import { DeviceErrorBoundaryWrapper } from './__create/DeviceErrorBoundary';
import { ErrorBoundaryWrapper, SharedErrorBoundary } from './__create/SharedErrorBoundary';

if (__DEV__) {
  LogBox.ignoreAllLogs();
  LogBox.uninstall();
  function WrapperComponentProvider({
    children,
  }: {
    children: ReactNode;
  }) {
    return <DeviceErrorBoundaryWrapper>{children}</DeviceErrorBoundaryWrapper>;
  }

  AppRegistry.setWrapperComponentProvider(() => WrapperComponentProvider);
  AppRegistry.registerComponent('main', () => App);
}
