import React from 'react';
import { StyleSheet } from 'react-native';

import { palette, spacing } from '@/app/theme';
import { HeaderProps } from '@/shared/types/header';
import { Header as AppHeader } from '@/shared/ui/Header';

export function Header(props: Partial<HeaderProps>) {
  return (
    <AppHeader
      containerStyle={styles.container}
      rightIconName="notifications-none"
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
