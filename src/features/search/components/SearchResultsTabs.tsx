import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { palette, spacing, typography } from '@/app/theme';
import type { SearchResultsTabOption } from '@/features/search/model/searchResults';

export type SearchResultsTabKey = string;

type SearchResultsTabsProps = {
  activeTab: SearchResultsTabKey;
  onChange: (tab: SearchResultsTabKey) => void;
  tabs: SearchResultsTabOption[];
};

export function SearchResultsTabs({
  activeTab,
  onChange,
  tabs,
}: SearchResultsTabsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable
            accessibilityRole="button"
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[
              styles.tab,
              index !== tabs.length - 1 && styles.tabDivider,
              isActive && styles.tabActive,
            ]}>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {t(tab.label)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.link,
    borderRadius: 6,
  },
  tab: {
    flex: 1,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    paddingHorizontal: spacing.sm,
  },
  tabDivider: {
    borderRightWidth: 1,
    borderRightColor: palette.link,
  },
  tabActive: {
    backgroundColor: palette.linkSoft,
  },
  tabLabel: {
    color: palette.textPrimary,
    fontSize: typography.body + 1,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  tabLabelActive: {
    fontWeight: '800',
  },
});
