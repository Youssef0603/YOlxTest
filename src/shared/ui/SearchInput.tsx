import React, { useState } from 'react';
import {
  I18nManager,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import { SearchInputProps } from '@/shared/types/searchInput';
import { Icon } from '@/shared/ui/Icon';

export function SearchInput({
  value,
  placeholder = 'Search',
  onChangeText,
  onPress,
  editable = true,
  autoFocus = false,
  containerStyle,
  inputStyle,
  inputProps,
}: SearchInputProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isActive = isFocused || isPressed;
  const isRTL = I18nManager.isRTL;

  return (
    <View
      style={[
        styles.container,
        isRTL ? styles.containerRtl : styles.containerLtr,
        isActive && styles.containerActive,
        containerStyle,
      ]}>
      <Icon color={palette.textPrimary} name="search" size={28} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        editable={editable}
        placeholder={t(placeholder)}
        placeholderTextColor={palette.textPlaceholder}
        selectionColor={palette.link}
        style={[styles.input, isRTL ? styles.inputRtl : styles.inputLtr, inputStyle]}
        value={value}
        onBlur={() => setIsFocused(false)}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        {...inputProps}
      />

      {!editable && onPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          style={styles.pressableOverlay}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: palette.borderNeutral,
    borderRadius: 8,
    backgroundColor: palette.white,
  },
  containerActive: {
    borderColor: palette.link,
  },
  containerLtr: {
    flexDirection: 'row',
  },
  containerRtl: {
    flexDirection: 'row-reverse',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    color: palette.textPrimary,
    fontSize: typography.heading,
    lineHeight: 26,
    textAlignVertical: 'center',
  },
  inputLtr: {
    textAlign: 'left',
    writingDirection: 'ltr',
  },
  inputRtl: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  pressableOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
});
