import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';

type SearchFiltersToggleRowProps = {
  onValueChange: (value: boolean) => void;
  title: string;
  value: boolean;
};

export function SearchFiltersToggleRow({
  onValueChange,
  title,
  value,
}: SearchFiltersToggleRowProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{t(title)}</Text>

      <Switch
        ios_backgroundColor="#D5D7DB"
        thumbColor={palette.white}
        trackColor={{ false: '#D5D7DB', true: palette.link }}
        value={value}
        onValueChange={onValueChange}
      />
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
  title: {
    flex: 1,
    color: palette.textPrimary,
    fontSize: typography.title - 1,
    lineHeight: 34,
    fontWeight: '400',
    textAlign: 'left'
  },
});
