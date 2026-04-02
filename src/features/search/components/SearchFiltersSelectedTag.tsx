import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import { Icon } from '@/shared/ui/Icon';

type SearchFiltersSelectedTagProps = {
  logoLabel?: string;
  onClear: () => void;
  value: string | null;
};

export function SearchFiltersSelectedTag({
  logoLabel,
  onClear,
  value,
}: SearchFiltersSelectedTagProps) {
  const { t } = useTranslation();

  if (!value) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateLabel}>{t('Any')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {logoLabel ? <Text style={styles.logoLabel}>{logoLabel}</Text> : null}
        <Text style={styles.valueLabel}>{value}</Text>
      </View>

      <Pressable accessibilityRole="button" onPress={onClear} style={styles.clearButton}>
        <Icon color={palette.textPrimary} name="close" size={30} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 6,
    paddingVertical: spacing.sm,
    backgroundColor: palette.surfaceSection,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logoLabel: {
    color: palette.oliveBrand,
    fontSize: typography.heading + 1,
    lineHeight: 28,
    fontWeight: '700',
  },
  valueLabel: {
    color: palette.textPrimary,
    fontSize: typography.heading + 1,
    lineHeight: 28,
    fontWeight: '700',
  },
  clearButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    minHeight: 64,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    borderRadius: 8,
    backgroundColor: palette.white,
  },
  emptyStateLabel: {
    color: palette.textSecondary,
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '400',
  },
});
