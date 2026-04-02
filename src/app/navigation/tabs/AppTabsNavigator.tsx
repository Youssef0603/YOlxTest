import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { OlxTabBar } from '@/app/navigation/tabs/OlxTabBar';
import { AppTabParamList } from '@/app/navigation/tabs/tabTypes';
import { AccountScreen } from '@/features/account/screens/AccountScreen';
import { ChatsScreen } from '@/features/chats/screens/ChatsScreen';
import { HomeScreen } from '@/features/home/HomeScreen';
import { MyAdsScreen } from '@/features/myAds/screens/MyAdsScreen';
import { SellScreen } from '@/features/sell/screens/SellScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

function renderTabBar(props: React.ComponentProps<typeof OlxTabBar>) {
  return <OlxTabBar {...props} />;
}

export function AppTabsNavigator() {
  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: 'transparent',
        },
      }}
      tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Sell" component={SellScreen} />
      <Tab.Screen name="MyAds" component={MyAdsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
