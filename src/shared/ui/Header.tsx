import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { palette, spacing } from '@/app/theme';
import { HeaderProps } from '@/shared/types/header';
import { Icon } from '@/shared/ui/Icon';

export function Header({
  title,
  titleIconName,
  titleIconColor = palette.textPrimary,
  showTitleChevron = false,
  onTitlePress,
  rightIconName,
  rightIconColor = palette.textPrimary,
  onRightPress,
  searchPlaceholder = 'Search',
  searchValue,
  onSearchChangeText,
  searchInputProps,
  leftContent,
  rightContent,
  containerStyle,
  showSearch = true,
}: HeaderProps) {
  const TitleContainer = onTitlePress ? Pressable : View;
  const RightContainer = onRightPress ? Pressable : View;
  const hasTopRow = Boolean(leftContent || rightContent || title || rightIconName);

  return (
    <View style={[styles.container, containerStyle]}>
      {hasTopRow ? (
        <View style={styles.topRow}>
          {leftContent ? (
            leftContent
          ) : (
            <TitleContainer onPress={onTitlePress} style={styles.titleRow}>
              {titleIconName ? (
                <Icon color={titleIconColor} name={titleIconName} size={20} />
              ) : null}
              {title ? <Text style={styles.titleText}>{title}</Text> : null}
              {showTitleChevron ? (
                <Icon color={palette.textPrimary} name="keyboard-arrow-down" size={28} />
              ) : null}
            </TitleContainer>
          )}

          {rightContent ? (
            rightContent
          ) : rightIconName ? (
            <RightContainer onPress={onRightPress} style={styles.iconButton}>
              <Icon color={rightIconColor} name={rightIconName} size={26} />
            </RightContainer>
          ) : (
            <View style={styles.iconButton} />
          )}
        </View>
      ) : null}

      {showSearch ? (
        <View style={styles.searchBar}>
          <Icon color={palette.textPrimary} name="search" size={28} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={searchPlaceholder}
            placeholderTextColor={palette.textPlaceholder}
            selectionColor={palette.textPrimary}
            style={styles.searchInput}
            value={searchValue}
            onChangeText={onSearchChangeText}
            {...searchInputProps}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  titleText: {
    color: palette.textPrimary,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 58,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    borderRadius: 8,
    backgroundColor: palette.white,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    color: palette.textPrimary,
    fontSize: 20,
    lineHeight: 26,
  },
});
