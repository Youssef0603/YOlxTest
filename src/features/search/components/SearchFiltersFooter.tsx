import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';

type SearchFiltersFooterProps = {
  label: string;
  onPress: () => void;
};

export function SearchFiltersFooter({
  label,
  onPress,
}: SearchFiltersFooterProps) {
  const { t } = useTranslation();

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{t(label)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: spacing.md,
    backgroundColor: palette.ctaDark,
  },
  label: {
    color: palette.white,
    fontSize: typography.heading,
    fontWeight: '700',
  },
});
