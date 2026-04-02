import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '@/app/navigation/rootTypes';
import { palette, spacing } from '@/app/theme';
import { HeaderProps } from '@/shared/types/header';
import { Header as AppHeader } from '@/shared/ui/Header';

export function Header(props: Partial<HeaderProps>) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <AppHeader
      containerStyle={styles.container}
      onSearchPress={() => navigation.navigate('Search')}
      rightIconName="notifications-none"
      searchEditable={false}
      searchPlaceholder="What are you looking for?"
      showTitleChevron
      title="Lebanon"
      titleIconColor={palette.accentWarm}
      titleIconName="place"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
});
