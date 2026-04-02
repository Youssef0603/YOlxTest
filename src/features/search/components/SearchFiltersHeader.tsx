import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import { Icon } from '@/shared/ui/Icon';

type SearchFiltersHeaderProps = {
  onClearAll: () => void;
  onClose: () => void;
  title: string;
};

export function SearchFiltersHeader({
  onClearAll,
  onClose,
  title,
}: SearchFiltersHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" onPress={onClose} style={styles.closeButton}>
        <Icon color={palette.textPrimary} name="close" size={34} />
      </Pressable>

      <Text style={styles.title}>{t(title)}</Text>

      <Pressable accessibilityRole="button" onPress={onClearAll}>
        <Text style={styles.actionLabel}>{t('Clear all')}</Text>
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
    paddingBottom: spacing.md,
  },
  closeButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: palette.textPrimary,
    fontSize: typography.heading + 5,
    lineHeight: 38,
    fontWeight: '400',
    textAlign: 'left'
  },
  actionLabel: {
    color: palette.textPrimary,
    fontSize: typography.body + 2,
    lineHeight: 26,
    fontWeight: '700',
  },
});
