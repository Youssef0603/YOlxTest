import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/app/navigation/rootTypes';
import { AppTabsNavigator } from '@/app/navigation/tabs/AppTabsNavigator';
import { SearchFiltersScreen } from '@/features/search/screens/SearchFiltersScreen';
import { SearchResultsScreen } from '@/features/search/screens/SearchResultsScreen';
import { SearchScreen } from '@/features/search/screens/SearchScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppTabsNavigator} name="Tabs" />
      <Stack.Screen
        component={SearchScreen}
        name="Search"
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        component={SearchResultsScreen}
        name="SearchResults"
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        component={SearchFiltersScreen}
        name="SearchFilters"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
