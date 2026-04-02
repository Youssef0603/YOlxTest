import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';

type SearchFiltersSectionProps = PropsWithChildren<{
  title?: string;
}>;

export function SearchFiltersSection({
  children,
  title,
}: SearchFiltersSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{t(title)}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.divider,
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    fontWeight: '700',
  },
});
