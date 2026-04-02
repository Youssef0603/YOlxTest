import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import { toggleAppLanguage } from '@/i18';
import { Screen } from '@/shared/ui/Screen';
import { Icon } from '@/shared/ui/Icon';

export function AccountScreen() {
  const { i18n, t } = useTranslation();
  const nextLanguageLabel = i18n.language.startsWith('ar') ? 'English' : 'العربية';

  return (
    <Screen>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          android_ripple={{ color: palette.surfaceSection }}
          onPress={async () => {
            await toggleAppLanguage();
          }}
          style={({ pressed }) => [
            styles.languageRow,
            pressed && styles.languageRowPressed,
          ]}>
          <Icon color={palette.textPrimary} name="language" size={38} />

          <View style={styles.textBlock}>
            <Text style={styles.languageLabel}>{nextLanguageLabel}</Text>
            <Text style={styles.languageHint}>{t('Change language')}</Text>
          </View>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
  },
  languageRowPressed: {
    backgroundColor: palette.surfaceSection,
  },
  textBlock: {
    flex: 1,
  },
  languageLabel: {
    color: palette.textPrimary,
    fontSize: typography.heading + 8,
    lineHeight: 38,
    fontWeight: '700',
  },
  languageHint: {
    color: palette.textSecondary,
    fontSize: typography.title,
    lineHeight: 34,
    fontWeight: '400',
  },
});
