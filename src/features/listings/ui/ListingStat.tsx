import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette, spacing, typography } from '@/app/theme';
import { IconName } from '@/shared/types/icons';
import { Icon } from '@/shared/ui/Icon';

type ListingStatProps = {
  iconName: IconName;
  value: string;
};

export function ListingStat({ iconName, value }: ListingStatProps) {
  return (
    <View style={styles.container}>
      <Icon color={palette.textSecondary} name={iconName} size={20} />
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  value: {
    color: palette.textSecondary,
    fontSize: typography.caption + 1,
    lineHeight: 18,
    fontWeight: '700',
  },
});
