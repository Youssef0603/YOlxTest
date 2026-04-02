import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';

type PopularCategoryItemProps = {
  label: string;
  onPress?: () => void;
};

export function PopularCategoryItem({ label, onPress }: PopularCategoryItemProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      android_ripple={{ color: palette.surfaceSection }}
      accessibilityRole={onPress ? 'button' : 'text'}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        onPress && pressed && styles.containerPressed,
      ]}>
      <Text style={styles.label}>{t(label)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  containerPressed: {
    backgroundColor: palette.surfaceSection,
  },
  label: {
    color: palette.textPrimary,
    fontSize: typography.body + 2,
    lineHeight: 28,
    fontWeight: '700',
  },
});
