import { App } from 'expo-router/build/qualified-entry';
import React, { memo } from 'react';
import { ErrorBoundaryWrapper } from './__create/SharedErrorBoundary';
import './src/__create/polyfills';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

const Wrapper = memo(() => {
  return (
    <ErrorBoundaryWrapper>
      <SafeAreaProvider>
        <App />
        <Toaster />
      </SafeAreaProvider>
    </ErrorBoundaryWrapper>
  );
});
export default function CreateApp() {
  return <Wrapper />;
}
