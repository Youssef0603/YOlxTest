import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing } from '@/app/theme';
import { HeaderProps } from '@/shared/types/header';
import { Icon } from '@/shared/ui/Icon';
import { SearchInput } from '@/shared/ui/SearchInput';

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
  onSearchPress,
  searchEditable = true,
  searchAutoFocus = false,
  searchInputProps,
  leftContent,
  rightContent,
  showRightPlaceholder = true,
  containerStyle,
  showSearch = true,
}: HeaderProps) {
  const { t } = useTranslation();
  const TitleContainer = onTitlePress ? Pressable : View;
  const RightContainer = onRightPress ? Pressable : View;
  const hasTopRow = Boolean(
    leftContent || rightContent || title || rightIconName || showRightPlaceholder,
  );

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
              {title ? <Text style={styles.titleText}>{t(title)}</Text> : null}
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
          ) : showRightPlaceholder ? (
            <View style={styles.iconButton} />
          ) : null
          }
        </View>
      ) : null}

      {showSearch ? (
        <SearchInput
          autoFocus={searchAutoFocus}
          editable={searchEditable}
          inputProps={searchInputProps}
          onChangeText={onSearchChangeText}
          onPress={onSearchPress}
          placeholder={searchPlaceholder}
          value={searchValue}
        />
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
    textAlign: 'left',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
});
