import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@/app/navigation/rootTypes';
import { palette, spacing, typography } from '@/app/theme';
import { useSearchFiltersData } from '@/features/search/hooks/useSearchFiltersData';
import { useSearchResultsData } from '@/features/search/hooks/useSearchResultsData';
import { SearchFiltersCategoryCard } from '@/features/search/components/SearchFiltersCategoryCard';
import { SearchFiltersFooter } from '@/features/search/components/SearchFiltersFooter';
import { SearchFiltersHeader } from '@/features/search/components/SearchFiltersHeader';
import { SearchFiltersOptionPill } from '@/features/search/components/SearchFiltersOptionPill';
import { SearchFiltersRangeInputs } from '@/features/search/components/SearchFiltersRangeInputs';
import { SearchFiltersSection } from '@/features/search/components/SearchFiltersSection';
import { SearchFiltersSelectionModal } from '@/features/search/components/SearchFiltersSelectionModal';
import { SearchFiltersToggleRow } from '@/features/search/components/SearchFiltersToggleRow';
import { SearchFiltersTriggerRow } from '@/features/search/components/SearchFiltersTriggerRow';
import {
  createSearchFiltersState,
  SearchFiltersOption,
  SearchFiltersSection as SearchFiltersSectionData,
} from '@/features/search/model/searchFilters';
import { ANY_FILTER_OPTION_VALUE, SearchFiltersState } from '@/features/search/types/search';
import { Screen } from '@/shared/ui/Screen';

type SelectionModalState = {
  fieldAttribute: string;
  isLocation: boolean;
  options: SearchFiltersOption[];
  searchEnabled: boolean;
  title: string;
} | null;

function formatLocalizedCount(language: string, count: number) {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-LB' : 'en-US').format(count);
}

function buildResultsLabel({
  count,
  language,
  t,
}: {
  count: number;
  language: string;
  t: ReturnType<typeof useTranslation>['t'];
}) {
  const formattedCount = formatLocalizedCount(language, count);

  if (count >= 10000) {
    return t('See {{count}}+ results', {
      count: formattedCount,
    });
  }

  return t('See {{count}} results', {
    count: formattedCount,
  });
}

function applyChoiceSelection({
  attribute,
  option,
  state,
}: {
  attribute: string;
  option: SearchFiltersOption;
  state: SearchFiltersState;
}) {
  const selectedOptions = {
    ...state.selectedOptions,
  };
  const selectedOptionLabels = {
    ...state.selectedOptionLabels,
  };

  if (option.value === ANY_FILTER_OPTION_VALUE) {
    delete selectedOptions[attribute];
    delete selectedOptionLabels[attribute];
  } else {
    selectedOptions[attribute] = option.value;
    selectedOptionLabels[attribute] = option.label;
  }

  return {
    ...state,
    selectedOptionLabels,
    selectedOptions,
  };
}

function shouldEnableSelectionSearch({
  isLocation,
  options,
}: {
  isLocation: boolean;
  options: SearchFiltersOption[];
}) {
  return isLocation || options.length >= 8;
}

export function SearchFiltersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'SearchFilters'>>();
  const { i18n, t } = useTranslation();
  const { activeTabKey, category, query } = route.params;
  const [filtersState, setFiltersState] = useState(() =>
    route.params.filtersState ?? createSearchFiltersState(),
  );
  const [selectionModal, setSelectionModal] = useState<SelectionModalState>(null);
  const { content, error, isLoading } = useSearchFiltersData({
    category,
    filtersState,
    language: i18n.language,
  });
  const { content: previewContent } = useSearchResultsData({
    activeTabKey,
    category,
    filters: filtersState,
    language: i18n.language,
    query,
    size: 1,
  });
  const resultsLabel = useMemo(
    () =>
      buildResultsLabel({
        count: previewContent?.resultCount ?? 0,
        language: i18n.language,
        t,
      }),
    [i18n.language, previewContent?.resultCount, t],
  );

  useEffect(() => {
    setFiltersState(route.params.filtersState ?? createSearchFiltersState());
  }, [category, route.params.filtersState]);

  const handleClearAll = () => {
    setFiltersState(createSearchFiltersState());
  };
  const handleApply = () => {
    navigation.popTo(
      'SearchResults',
      {
        activeTabKey,
        category,
        filtersState,
        query,
      },
      {
        merge: true,
      },
    );
  };
  const handleOptionSelect = (option: SearchFiltersOption) => {
    if (!selectionModal) {
      return;
    }

    setFiltersState(current => {
      if (selectionModal.isLocation) {
        return {
          ...current,
          locationExternalId: option.value,
          locationLabel: option.label,
        };
      }

      return applyChoiceSelection({
        attribute: selectionModal.fieldAttribute,
        option,
        state: current,
      });
    });
  };
  const renderUnavailableState = ({
    body,
    title,
  }: {
    body?: string | null;
    title: string;
  }) => {
    return (
      <Screen>
        <View style={styles.emptyContainer}>
          <SearchFiltersHeader
            onClearAll={handleClearAll}
            onClose={() => navigation.goBack()}
            title={content?.title ?? 'Filters'}
          />
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>{t(title)}</Text>
            {body ? <Text style={styles.emptyStateText}>{body}</Text> : null}
          </View>
        </View>
      </Screen>
    );
  };

  if (isLoading && !content) {
    return renderUnavailableState({
      body: t('Loading filters...'),
      title: 'Filters',
    });
  }

  if (!content) {
    return renderUnavailableState({
      body: error,
      title: 'Unable to load filters.',
    });
  }

  return (
    <Screen>
      <View style={styles.container}>
        <SearchFiltersHeader
          onClearAll={handleClearAll}
          onClose={() => navigation.goBack()}
          title={content.title}
        />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          style={styles.scroll}>
          {content.sections.map((section: SearchFiltersSectionData) => {
            if (section.kind === 'category') {
              return (
                <SearchFiltersSection key={section.id} title={section.title}>
                  <SearchFiltersCategoryCard
                    actionLabel={section.actionLabel}
                    imageSource={section.imageSource}
                    parentLabel={section.parentLabel}
                    valueLabel={section.valueLabel}
                  />
                </SearchFiltersSection>
              );
            }

            if (section.kind === 'row') {
              return (
                <SearchFiltersSection key={section.id} title={section.sectionTitle}>
                  <SearchFiltersTriggerRow
                    onPress={() =>
                      setSelectionModal({
                        fieldAttribute: section.fieldAttribute ?? section.id,
                        isLocation: section.id === 'location',
                        options: section.options,
                        searchEnabled: shouldEnableSelectionSearch({
                          isLocation: section.id === 'location',
                          options: section.options,
                        }),
                        title: section.id === 'location' ? 'Locations' : section.title,
                      })
                    }
                    showChevron={section.showChevron}
                    title={section.title}
                    value={section.value}
                  />
                </SearchFiltersSection>
              );
            }

            if (section.kind === 'choice') {
              return (
                <SearchFiltersSection key={section.id} title={section.title}>
                  <View style={styles.optionsRow}>
                    {section.options.map(option => (
                      <SearchFiltersOptionPill
                        key={`${section.id}-${option.value}`}
                        label={option.label}
                        selected={
                          option.value === ANY_FILTER_OPTION_VALUE
                            ? !filtersState.selectedOptions[section.fieldAttribute]
                            : filtersState.selectedOptions[section.fieldAttribute] ===
                              option.value
                        }
                        onPress={() =>
                          setFiltersState(current =>
                            applyChoiceSelection({
                              attribute: section.fieldAttribute,
                              option,
                              state: current,
                            }),
                          )
                        }
                      />
                    ))}
                  </View>
                </SearchFiltersSection>
              );
            }

            if (section.kind === 'range') {
              return (
                <SearchFiltersSection key={section.id} title={section.title}>
                  <SearchFiltersRangeInputs
                    maxPlaceholder={section.maxPlaceholder}
                    maxValue={filtersState.ranges[section.fieldAttribute]?.max ?? ''}
                    minPlaceholder={section.minPlaceholder}
                    minValue={filtersState.ranges[section.fieldAttribute]?.min ?? ''}
                    onChangeMax={value =>
                      setFiltersState(current => ({
                        ...current,
                        ranges: {
                          ...current.ranges,
                          [section.fieldAttribute]: {
                            ...(current.ranges[section.fieldAttribute] ?? {
                              max: '',
                              min: '',
                            }),
                            max: value,
                          },
                        },
                      }))
                    }
                    onChangeMin={value =>
                      setFiltersState(current => ({
                        ...current,
                        ranges: {
                          ...current.ranges,
                          [section.fieldAttribute]: {
                            ...(current.ranges[section.fieldAttribute] ?? {
                              max: '',
                              min: '',
                            }),
                            min: value,
                          },
                        },
                      }))
                    }
                  />
                </SearchFiltersSection>
              );
            }

            return (
              <SearchFiltersSection key={section.id}>
                <SearchFiltersToggleRow
                  title={section.title}
                  value={filtersState.toggles[section.fieldAttribute] ?? false}
                  onValueChange={value =>
                    setFiltersState(current => ({
                      ...current,
                      toggles: {
                        ...current.toggles,
                        [section.fieldAttribute]: value,
                      },
                    }))
                  }
                />
              </SearchFiltersSection>
            );
          })}
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.footerSafeArea}>
          <View style={styles.footer}>
            <SearchFiltersFooter
              label={resultsLabel}
              onPress={handleApply}
            />
          </View>
        </SafeAreaView>

        <SearchFiltersSelectionModal
          isLocation={selectionModal?.isLocation}
          onClose={() => setSelectionModal(null)}
          onSelect={handleOptionSelect}
          options={selectionModal?.options ?? []}
          searchEnabled={selectionModal?.searchEnabled}
          selectedValue={
            selectionModal
              ? selectionModal.isLocation
                ? filtersState.locationExternalId
                : filtersState.selectedOptions[selectionModal.fieldAttribute]
              : undefined
          }
          title={selectionModal?.title ?? ''}
          visible={Boolean(selectionModal)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.lg,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  footerSafeArea: {
    backgroundColor: palette.background,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    gap: spacing.lg,
  },
  emptyState: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  emptyStateTitle: {
    color: palette.textPrimary,
    fontSize: typography.heading,
    lineHeight: 28,
    textAlign: 'center',
  },
  emptyStateText: {
    color: palette.textSecondary,
    fontSize: typography.body + 1,
    lineHeight: 24,
    textAlign: 'center',
  },
});
