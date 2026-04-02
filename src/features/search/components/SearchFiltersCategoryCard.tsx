import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';

type SearchFiltersCategoryCardProps = {
  actionLabel: string;
  imageSource: ImageSourcePropType;
  parentLabel: string;
  valueLabel: string;
};

export function SearchFiltersCategoryCard({
  actionLabel,
  imageSource,
  parentLabel,
  valueLabel,
}: SearchFiltersCategoryCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <View style={styles.infoRow}>
        <Image source={imageSource} style={styles.image} />

        <View style={styles.textBlock}>
          <Text style={styles.parentLabel}>{t(parentLabel)}</Text>
          <Text style={styles.valueLabel}>{t(valueLabel)}</Text>
        </View>
      </View>

      <Pressable accessibilityRole="button">
        <Text style={styles.actionLabel}>{t(actionLabel)}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  textBlock: {
    gap: spacing.xs,
  },
  parentLabel: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    fontWeight: '700',
  },
  valueLabel: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    fontWeight: '400',
  },
  actionLabel: {
    color: palette.textPrimary,
    fontSize: typography.body + 2,
    fontWeight: '700',
  },
});
