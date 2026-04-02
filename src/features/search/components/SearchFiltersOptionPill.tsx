import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';

type SearchFiltersOptionPillProps = {
  label: string;
  onPress: () => void;
  selected: boolean;
};

export function SearchFiltersOptionPill({
  label,
  onPress,
  selected,
}: SearchFiltersOptionPillProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      android_ripple={{ color: palette.surfaceSection }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        selected && styles.containerSelected,
        pressed && styles.containerPressed,
      ]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{t(label)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    borderRadius: 999,
    backgroundColor: palette.white,
  },
  containerSelected: {
    borderColor: palette.link,
    backgroundColor: palette.linkSoft,
  },
  containerPressed: {
    backgroundColor: palette.surfaceSection,
  },
  label: {
    color: palette.textPrimary,
    fontSize: typography.body,
    lineHeight: 24,
    fontWeight: '400',
  },
  labelSelected: {
    color: palette.link,
  },
});
