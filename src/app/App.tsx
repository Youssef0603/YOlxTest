import React from 'react';
import { StatusBar } from 'react-native';

import { RootNavigator } from '@/app/navigation/RootNavigator';
import { AppProviders } from '@/app/providers/AppProviders';
import { palette } from '@/app/theme';

function App() {
  return (
    <AppProviders>
      <StatusBar
        backgroundColor={palette.background}
        barStyle="dark-content"
      />
      <RootNavigator />
    </AppProviders>
  );
}

export default App;
