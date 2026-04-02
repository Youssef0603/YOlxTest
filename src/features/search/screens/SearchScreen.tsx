import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from '@/app/navigation/rootTypes';
import { palette, spacing, typography } from '@/app/theme';
import {
  PopularSearchCategory,
  popularSearchCategories,
} from '@/features/search/model/search';
import { getBackIconName } from '@/shared/lib/rtl';
import { PopularCategoryItem } from '@/features/search/components/PopularCategoryItem';
import { SearchSection } from '@/features/search/components/SearchSection';
import { isSearchResultsCategory } from '@/features/search/model/searchResults';
import { Header } from '@/shared/ui/Header';
import { Icon } from '@/shared/ui/Icon';
import { Screen } from '@/shared/ui/Screen';

export function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const handleCategoryPress = (category: PopularSearchCategory) => {
    if (!isSearchResultsCategory(category)) {
      return;
    }

    setTimeout(() => {
      navigation.navigate('SearchResults', {
        category,
        query,
      });
    }, 120);
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          leftContent={
            <View style={styles.leadingContent}>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Icon
                  color={palette.textPrimary}
                  name={getBackIconName()}
                  size={28}
                />
              </Pressable>
              <Text style={styles.title}>{t('Quick Filters')}</Text>
            </View>
          }
          onSearchChangeText={setQuery}
          searchAutoFocus
          searchPlaceholder="Find Cars, Mobile Phones and more"
          searchValue={query}
          showRightPlaceholder={false}
        />

        <SearchSection title="POPULAR CATEGORIES">
          {popularSearchCategories.map(category => (
            <PopularCategoryItem
              key={category}
              label={category}
              onPress={isSearchResultsCategory(category)
                ? () => handleCategoryPress(category)
                : undefined}
            />
          ))}
        </SearchSection>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.lg,
  },
  leadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.heading + 4,
    lineHeight: 36,
    fontWeight: '400',
    textAlign: 'left',
  },
});
