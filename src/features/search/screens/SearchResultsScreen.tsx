import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from '@/app/navigation/rootTypes';
import { palette, spacing, typography } from '@/app/theme';
import { useSearchResultsData } from '@/features/search/hooks/useSearchResultsData';
import { EliteListingCard } from '@/features/search/components/EliteListingCard';
import { FeaturedSearchListingCard } from '@/features/search/components/FeaturedSearchListingCard';
import { FeaturedBusinessItem } from '@/features/search/components/FeaturedBusinessItem';
import { SearchFilterChip } from '@/features/search/components/SearchFilterChip';
import { SearchResultsHeader } from '@/features/search/components/SearchResultsHeader';
import { SearchResultsSectionHeader } from '@/features/search/components/SearchResultsSectionHeader';
import {
  createSearchFiltersState,
  hasActiveSearchFilters,
} from '@/features/search/model/searchFilters';
import { SearchResultsTabs } from '@/features/search/components/SearchResultsTabs';
import { getSearchResultsCategoryDefinition } from '@/features/search/model/searchResults';
import type { SearchFiltersState } from '@/features/search/types/search';
import { Icon } from '@/shared/ui/Icon';
import { Screen } from '@/shared/ui/Screen';

type SearchResultsChipItem = {
  id: string;
  iconName?: React.ComponentProps<typeof SearchFilterChip>['iconName'];
  label: string;
  selected?: boolean;
  showChevron?: boolean;
};

function formatLocalizedCount(language: string, count: number) {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-LB' : 'en-US').format(count);
}

function hasRangeValue(range?: { min: string; max: string }) {
  if (!range) {
    return false;
  }

  return Boolean(range.min.trim() || range.max.trim());
}

function buildFilterChips({
  definition,
  filtersState,
}: {
  definition: ReturnType<typeof getSearchResultsCategoryDefinition>;
  filtersState: SearchFiltersState;
}) {
  const chips: SearchResultsChipItem[] = [
    {
      id: 'category',
      label: definition.categoryChipLabel,
      selected: true,
      showChevron: true,
    },
    {
      iconName: 'tune',
      id: 'filters',
      label: 'Filters',
      selected: hasActiveSearchFilters(filtersState),
      showChevron: true,
    },
  ];

  if (filtersState.locationLabel && filtersState.locationExternalId !== '0-1') {
    chips.push({
      id: 'location',
      label: filtersState.locationLabel,
      selected: true,
      showChevron: true,
    });
  }

  Object.entries(filtersState.selectedOptionLabels)
    .filter(([, label]) => Boolean(label))
    .slice(0, 2)
    .forEach(([attribute, label]) => {
      chips.push({
        id: `option-${attribute}`,
        label,
        selected: true,
        showChevron: true,
      });
    });

  if (hasRangeValue(filtersState.ranges.price)) {
    chips.push({
      id: 'price',
      label: 'Price',
      selected: true,
      showChevron: true,
    });
  }

  if (filtersState.toggles.verified) {
    chips.push({
      id: 'verified',
      label: 'Verified',
      selected: true,
      showChevron: true,
    });
  }

  return chips;
}

export function SearchResultsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'SearchResults'>>();
  const { i18n, t } = useTranslation();
  const category = route.params.category;
  const definition = useMemo(
    () => getSearchResultsCategoryDefinition(category),
    [category],
  );
  const [query, setQuery] = useState(route.params.query ?? '');
  const [filtersState, setFiltersState] = useState<SearchFiltersState>(
    route.params.filtersState ?? createSearchFiltersState(),
  );
  const [activeTab, setActiveTab] = useState(
    route.params.activeTabKey ?? definition.tabs[0]?.key ?? 'all',
  );
  const { content, error, isLoading } = useSearchResultsData({
    activeTabKey: activeTab,
    category,
    filters: filtersState,
    language: i18n.language,
    query,
  });
  const chips = useMemo(
    () =>
      buildFilterChips({
        definition,
        filtersState,
      }),
    [definition, filtersState],
  );

  useEffect(() => {
    setQuery(route.params.query ?? '');
  }, [category, route.params.query]);

  useEffect(() => {
    setFiltersState(route.params.filtersState ?? createSearchFiltersState());
  }, [category, route.params.filtersState]);

  useEffect(() => {
    setActiveTab(route.params.activeTabKey ?? definition.tabs[0]?.key ?? 'all');
  }, [category, definition.tabs, route.params.activeTabKey]);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate('Tabs');
  };
  const openFilters = () =>
    navigation.navigate('SearchFilters', {
      activeTabKey: activeTab,
      category,
      filtersState,
      query,
    });
  const hasFeaturedBusinesses = Boolean(content?.featuredBusinesses.length);
  const hasTabs = Boolean(content?.tabs.length);
  const formattedResultCount = formatLocalizedCount(
    i18n.language,
    content?.resultCount ?? 0,
  );

  return (
    <Screen>
      <View style={styles.container}>
        <SearchResultsHeader
          onBackPress={handleBackPress}
          onSearchChangeText={setQuery}
          searchValue={query}
        />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          style={styles.scroll}>
            <View>

          <ScrollView
            contentContainerStyle={styles.filtersContent}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {chips.map(chip => (
              <SearchFilterChip
                iconName={chip.iconName}
                key={chip.id}
                label={chip.label}
                onPress={openFilters}
                selected={chip.selected}
                showChevron={chip.showChevron}
              />
            ))}
          </ScrollView>
            </View>

          {content ? (
            <>
              <View style={styles.summaryRow}>
                <Text numberOfLines={1} style={styles.summaryText}>
                  <Text style={styles.summaryPrefix}>{t('Showing:')} </Text>
                  <Text style={styles.summaryHighlight}>
                    {formattedResultCount} {t('Results for')} {t(definition.categoryChipLabel)}
                  </Text>
                </Text>

                <Pressable accessibilityRole="button" style={styles.sortButton}>
                  <Text style={styles.sortLabel}>{t('Sort By')}</Text>
                  <Icon color={palette.link} name="sort" size={20} />
                </Pressable>
              </View>

              {hasTabs ? (
                <View style={styles.tabsWrapper}>
                  <SearchResultsTabs
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    tabs={content.tabs}
                  />
                </View>
              ) : null}

              <View style={styles.divider} />

              {hasFeaturedBusinesses ? (
                <>
                  <View style={styles.section}>
                    <SearchResultsSectionHeader title="Featured Businesses" />
                    <View style={styles.businessesRow}>
                      {content.featuredBusinesses.map(item => (
                        <FeaturedBusinessItem item={item} key={item.id} />
                      ))}
                    </View>
                  </View>

                  <View style={styles.divider} />
                </>
              ) : null}

              <View style={styles.section}>
                <SearchResultsSectionHeader title={content.listingSectionTitle} />

                <View style={styles.listings}>
                  {content.listingVariant === 'elite'
                    ? content.listings.map(item => (
                        <EliteListingCard item={item} key={item.id} />
                      ))
                    : content.listings.map(item => (
                        <FeaturedSearchListingCard item={item} key={item.id} />
                      ))}
                </View>
              </View>
            </>
          ) : (
            <View style={styles.feedbackState}>
              {isLoading ? (
                <>
                  <ActivityIndicator color={palette.link} size="small" />
                  <Text style={styles.feedbackText}>{t('Loading results...')}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.feedbackTitle}>{t('Unable to load results.')}</Text>
                  {error ? <Text style={styles.feedbackText}>{error}</Text> : null}
                </>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: spacing.md + 1,
    paddingBottom: spacing.xl,
  },
  filtersContent: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  summaryText: {
    flex: 1,
    fontSize: typography.body,
    textAlign: 'left'
  },
  summaryPrefix: {
    color: palette.textSecondary,
    fontWeight: '400',
  },
  summaryHighlight: {
    color: palette.textPrimary,
    fontWeight: '800',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sortLabel: {
    color: palette.link,
    fontSize: typography.body,
    fontWeight: '800',
  },
  tabsWrapper: {
    paddingHorizontal: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: palette.divider,
    marginHorizontal: spacing.lg,
  },
  section: {
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  businessesRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  listings: {
    gap: spacing.lg,
  },
  feedbackState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  feedbackTitle: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  feedbackText: {
    color: palette.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
    textAlign: 'center',
  },
});
