import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette, spacing } from '@/app/theme';

type ScreenProps = PropsWithChildren<{
  scrollable?: boolean;
}>;

export function Screen({ children, scrollable = false }: ScreenProps) {
  const insets = useSafeAreaInsets();

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.xl,
          },
        ]}
        style={styles.base}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.base,
        {
          paddingTop: insets.top + spacing.lg,
          paddingBottom: insets.bottom + spacing.xl,
        },
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    gap: spacing.lg,
  },
});
