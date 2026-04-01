import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette, spacing, typography } from '@/app/theme';

type TagProps = {
  label: string;
  tone?: 'default' | 'accent' | 'warning';
};

const toneStyles = {
  default: {
    backgroundColor: palette.surfaceMuted,
    color: palette.textSecondary,
  },
  accent: {
    backgroundColor: palette.accentSoft,
    color: palette.accent,
  },
  warning: {
    backgroundColor: '#F8E6C9',
    color: '#8E5A13',
  },
} as const;

export function Tag({ label, tone = 'default' }: TagProps) {
  const toneStyle = toneStyles[tone];

  return (
    <View style={[styles.container, { backgroundColor: toneStyle.backgroundColor }]}>
      <Text style={[styles.label, { color: toneStyle.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  label: {
    fontSize: typography.caption,
    fontWeight: '700',
  },
});
