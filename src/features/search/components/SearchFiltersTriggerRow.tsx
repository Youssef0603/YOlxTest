import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import { getForwardChevronIconName } from '@/shared/lib/rtl';
import { Icon } from '@/shared/ui/Icon';

type SearchFiltersTriggerRowProps = {
  actionLabel?: string;
  onPress?: () => void;
  showChevron?: boolean;
  title: string;
  value: string;
};

export function SearchFiltersTriggerRow({
  actionLabel,
  onPress,
  showChevron = false,
  title,
  value,
}: SearchFiltersTriggerRowProps) {
  const { t } = useTranslation();
  const content = (
    <View style={styles.row}>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{t(title)}</Text>
        <Text style={styles.value}>{t(value)}</Text>
      </View>

      {actionLabel ? (
        <Text style={styles.actionLabel}>{t(actionLabel)}</Text>
      ) : showChevron ? (
        <Icon
          color={palette.textPrimary}
          name={getForwardChevronIconName()}
          size={34}
        />
      ) : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    lineHeight: 32,
    fontWeight: '700',
  },
  value: {
    color: palette.textSecondary,
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '400',
  },
  actionLabel: {
    color: palette.textPrimary,
    fontSize: typography.body,
    lineHeight: 24,
    fontWeight: '700',
  },
});
