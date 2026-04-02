import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';

type SearchSectionProps = PropsWithChildren<{
  title: string;
}>;

export function SearchSection({ title, children }: SearchSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t(title)}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: palette.surfaceSection,
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '800',
  },
  content: {
    backgroundColor: palette.white,
  },
});
