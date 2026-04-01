import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { palette, spacing, typography } from '@/app/theme';
import { SectionHeaderProps } from '@/shared/types/sectionHeader';

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  onActionPress,
  containerStyle,
  contentStyle,
  titleStyle,
  actionStyle,
  eyebrowStyle,
  descriptionStyle,
}: SectionHeaderProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        <View style={[styles.content, contentStyle]}>
          {eyebrow ? <Text style={[styles.eyebrow, eyebrowStyle]}>{eyebrow}</Text> : null}
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {description ? (
            <Text style={[styles.description, descriptionStyle]}>{description}</Text>
          ) : null}
        </View>

        {actionLabel ? (
          <Pressable
            accessibilityRole={onActionPress ? 'button' : 'text'}
            disabled={!onActionPress}
            onPress={onActionPress}>
            <Text style={[styles.action, actionStyle]}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  content: {
    flex: 1,
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
  action: {
    color: palette.link,
    fontSize: typography.body,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
