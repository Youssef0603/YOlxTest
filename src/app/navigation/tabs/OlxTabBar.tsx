import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette, spacing, typography } from '@/app/theme';
import { ICONS, ICON_TYPE } from '@/shared/types/icons';
import { Icon } from '@/shared/ui/Icon';

const tabConfig = {
  Home: {
    label: 'HOME',
    activeIcon: ICONS.HOME_FILLED,
    inactiveIcon: ICONS.HOME,
  },
  Chats: {
    label: 'CHATS',
    activeIcon: ICONS.CHAT_BUBBLE,
    inactiveIcon: ICONS.CHAT_OUTLINE,
  },
  Sell: {
    label: 'Sell',
    activeIcon: ICONS.ADD,
    inactiveIcon: ICONS.ADD,
  },
  MyAds: {
    label: 'MY ADS',
    activeIcon: ICONS.MENU,
    inactiveIcon: ICONS.MENU_OUTLINE,
  },
  Account: {
    label: 'ACCOUNT',
    activeIcon: ICONS.PERSON,
    inactiveIcon: ICONS.PERSON_OUTLINE,
  },
} as const;

export function OlxTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language.startsWith('ar');

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isSellTab = route.name === 'Sell';
          const isFocused = !isSellTab && state.index === index;
          const options = descriptors[route.key].options;
          const config = tabConfig[route.name as keyof typeof tabConfig];
          const iconName = isFocused ? config.activeIcon : config.inactiveIcon;
          const iconType =
            route.name === 'Home' || route.name === 'Chats' || route.name === 'MyAds'
              ? ICON_TYPE.svg
              : undefined;
          const iconSize =
            route.name === 'MyAds'
              ? 26
              : route.name === 'Account'
                ? 34
                : isSellTab
                  ? 32
                  : 30;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              disabled={isSellTab}
              onLongPress={isSellTab ? undefined : onLongPress}
              onPress={isSellTab ? undefined : onPress}
              style={styles.tabButton}
              testID={options.tabBarButtonTestID}>
              <View style={styles.iconSlot}>
                {isSellTab ? (
                  <View style={styles.sellCircle}>
                    <Icon
                      color={palette.textPrimary}
                      name={iconName}
                      size={iconSize}
                      type={iconType}
                    />
                  </View>
                ) : (
                  <Icon
                    color={palette.textPrimary}
                    name={iconName}
                    size={iconSize}
                    type={iconType}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.label,
                  isArabic && styles.labelArabic,
                  isSellTab && styles.sellLabel,
                ]}>
                {t(config.label)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.white,
    overflow: 'visible',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  iconSlot: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  sellCircle: {
    width: 53,
    height: 53,
    borderRadius: 99,
    backgroundColor: palette.accentWarm,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -20 }],
    shadowColor: palette.shadow,
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 4,
  },
  label: {
    color: palette.textPrimary,
    fontSize: typography.label,
    lineHeight: 16,
    fontWeight: '800',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  labelArabic: {
    letterSpacing: 0,
  },
  sellLabel: {
    marginTop: -10,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
});
