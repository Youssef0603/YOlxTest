import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';

type SearchFiltersRangeInputsProps = {
  maxPlaceholder: string;
  maxValue: string;
  minPlaceholder: string;
  minValue: string;
  onChangeMax: (value: string) => void;
  onChangeMin: (value: string) => void;
};

export function SearchFiltersRangeInputs({
  maxPlaceholder,
  maxValue,
  minPlaceholder,
  minValue,
  onChangeMax,
  onChangeMin,
}: SearchFiltersRangeInputsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <TextInput
        keyboardType="number-pad"
        placeholder={t(minPlaceholder)}
        placeholderTextColor={palette.textSecondary}
        selectionColor={palette.link}
        style={styles.input}
        value={minValue}
        onChangeText={onChangeMin}
      />
      <TextInput
        keyboardType="number-pad"
        placeholder={t(maxPlaceholder)}
        placeholderTextColor={palette.textSecondary}
        selectionColor={palette.link}
        style={styles.input}
        value={maxValue}
        onChangeText={onChangeMax}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: palette.textSecondary,
    borderRadius: 6,
    color: palette.textPrimary,
    fontSize: typography.heading + 1,
  },
});
