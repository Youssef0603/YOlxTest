import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette, spacing, typography } from '@/app/theme';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  eyebrow: {
    color: palette.accent,
    fontSize: typography.label,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.title,
    fontWeight: '700',
    lineHeight: 34,
  },
  description: {
    color: palette.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
