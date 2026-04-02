import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import { getForwardChevronIconName } from '@/shared/lib/rtl';
import { Icon } from '@/shared/ui/Icon';

type SearchResultsSectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SearchResultsSectionHeader({
  title,
  actionLabel,
  onActionPress,
}: SearchResultsSectionHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(title)}</Text>

      {actionLabel ? (
        <Pressable
          accessibilityRole={onActionPress ? 'button' : 'text'}
          disabled={!onActionPress}
          onPress={onActionPress}
          style={styles.actionButton}>
          <Text style={styles.actionLabel}>{t(actionLabel)}</Text>
          <Icon
            color={palette.textPrimary}
            name={getForwardChevronIconName()}
            size={28}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: {
    flex: 1,
    color: palette.textPrimary,
    fontSize: typography.title - 2,
    lineHeight: 34,
    fontWeight: '400',
    textAlign: 'left',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs - 1,
  },
  actionLabel: {
    color: palette.textPrimary,
    fontSize: typography.body,
    lineHeight: 24,
    fontWeight: '800',
    textAlign: 'left',
  },
});
