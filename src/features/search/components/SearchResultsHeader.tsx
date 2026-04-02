import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { palette, spacing } from '@/app/theme';
import { getBackIconName } from '@/shared/lib/rtl';
import { Icon } from '@/shared/ui/Icon';
import { SearchInput } from '@/shared/ui/SearchInput';

type SearchResultsHeaderProps = {
  onBackPress: () => void;
  onSearchChangeText: (text: string) => void;
  searchValue: string;
};

export function SearchResultsHeader({
  onBackPress,
  onSearchChangeText,
  searchValue,
}: SearchResultsHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={onBackPress}
        style={styles.backButton}>
        <Icon
          color={palette.textPrimary}
          name={getBackIconName()}
          size={28}
        />
      </Pressable>

      <SearchInput
        containerStyle={styles.searchInput}
        onChangeText={onSearchChangeText}
        placeholder="What are you looking for?"
        value={searchValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
  },
});
