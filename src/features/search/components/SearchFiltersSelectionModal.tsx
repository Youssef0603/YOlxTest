import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, spacing, typography } from '@/app/theme';
import type { SearchFiltersOption } from '@/features/search/model/searchFilters';
import { getForwardChevronIconName } from '@/shared/lib/rtl';
import { SearchInput } from '@/shared/ui/SearchInput';
import { Icon } from '@/shared/ui/Icon';

type SearchFiltersSelectionModalProps = {
  isLocation?: boolean;
  onClose: () => void;
  onSelect: (option: SearchFiltersOption) => void;
  options: SearchFiltersOption[];
  searchEnabled?: boolean;
  selectedValue?: string;
  title: string;
  visible: boolean;
};

export function SearchFiltersSelectionModal({
  isLocation = false,
  onClose,
  onSelect,
  options,
  searchEnabled = false,
  selectedValue,
  title,
  visible,
}: SearchFiltersSelectionModalProps) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!visible) {
      setSearchValue('');
    }
  }, [visible]);

  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const filteredOptions = useMemo(() => {
    if (!normalizedSearchValue) {
      return options;
    }

    return options.filter(option =>
      option.label.toLocaleLowerCase().includes(normalizedSearchValue),
    );
  }, [normalizedSearchValue, options]);
  const rootLocationOption = isLocation ? options[0] : undefined;
  const recentLocationOptions = useMemo(() => {
    if (!isLocation || !selectedValue || selectedValue === rootLocationOption?.value) {
      return [];
    }

    return filteredOptions.filter(option => option.value === selectedValue);
  }, [filteredOptions, isLocation, rootLocationOption?.value, selectedValue]);
  const locationRegionOptions = useMemo(() => {
    if (!isLocation) {
      return [];
    }

    return filteredOptions.filter(
      option =>
        option.value !== selectedValue,
    );
  }, [filteredOptions, isLocation, selectedValue]);
  const genericOptions = isLocation ? [] : filteredOptions;
  const hasResults = isLocation
    ? Boolean(recentLocationOptions.length || locationRegionOptions.length)
    : Boolean(genericOptions.length);

  const renderLocationRow = (option: SearchFiltersOption) => {
    const isSelected = option.value === selectedValue;

    return (
      <Pressable
        android_ripple={{ color: palette.surfaceSection }}
        key={`${title}-${option.value}`}
        onPress={() => {
          onSelect(option);
          onClose();
        }}
        style={({ pressed }) => [
          styles.locationRow,
          isSelected && styles.locationRowSelected,
          pressed && styles.rowPressed,
        ]}>
        <Text
          style={[
            styles.locationLabel,
            isSelected && styles.locationLabelSelected,
          ]}>
          {t(option.label)}
        </Text>
        <Icon
          color={palette.textPrimary}
          name={getForwardChevronIconName()}
          size={32}
        />
      </Pressable>
    );
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
      visible={visible}>
      <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.screen}>
          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={styles.closeButton}>
              <Icon color={palette.textPrimary} name="close" size={36} />
            </Pressable>
            <Text style={styles.title}>{t(title)}</Text>
            <View style={styles.headerSpacer} />
          </View>

          {searchEnabled ? (
            <View style={styles.searchRow}>
              <SearchInput
                autoFocus={visible}
                containerStyle={styles.searchInput}
                inputStyle={styles.searchInputText}
                inputProps={{
                  returnKeyType: 'search',
                }}
                onChangeText={setSearchValue}
                placeholder={isLocation ? 'Search locations' : 'Search'}
                value={searchValue}
              />
              <Pressable
                accessibilityRole="button"
                onPress={() => setSearchValue('')}
                style={styles.clearButton}>
                <Text style={styles.clearLabel}>{t('Clear')}</Text>
              </Pressable>
            </View>
          ) : null}

          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {isLocation ? (
              <>
                {recentLocationOptions.length ? (
                  <>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderLabel}>{t('Recent')}</Text>
                    </View>
                    <View style={styles.sectionBody}>
                      {recentLocationOptions.map(option => renderLocationRow(option))}
                    </View>
                  </>
                ) : null}

                {locationRegionOptions.length ? (
                  <>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderLabel}>{t('Choose region')}</Text>
                    </View>
                    <View style={styles.sectionBody}>
                      {locationRegionOptions.map(option => renderLocationRow(option))}
                    </View>
                  </>
                ) : null}
              </>
            ) : (
              <View style={styles.sectionBody}>
                {genericOptions.map(option => {
                  const isSelected = option.value === selectedValue;

                  return (
                    <Pressable
                      android_ripple={{ color: palette.surfaceSection }}
                      key={`${title}-${option.value}`}
                      onPress={() => {
                        onSelect(option);
                        onClose();
                      }}
                      style={({ pressed }) => [
                        styles.optionRow,
                        isSelected && styles.optionRowSelected,
                        pressed && styles.rowPressed,
                      ]}>
                      <Text
                        style={[
                          styles.optionLabel,
                          isSelected && styles.optionLabelSelected,
                        ]}>
                        {t(option.label)}
                      </Text>
                      {isSelected ? (
                        <Icon color={palette.link} name="check" size={24} />
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            )}

            {!hasResults ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateLabel}>{t('No matches found')}</Text>
              </View>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  headerSpacer: {
    width: 40,
  },
  title: {
    color: palette.textPrimary,
    flex: 1,
    fontSize: typography.title + 1,
    lineHeight: 30,
    fontWeight: '400',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    minHeight: 54,
    borderColor: '#66C5F5',
  },
  searchInputText: {
    fontSize: typography.heading - 1,
    lineHeight: 24,
  },
  clearButton: {
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearLabel: {
    color: palette.textPrimary,
    fontSize: typography.body + 1,
    lineHeight: 24,
    fontWeight: '700',
  },
  content: {
    paddingBottom: spacing.xl,
  },
  sectionHeader: {
    backgroundColor: palette.surfaceSection,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  sectionHeaderLabel: {
    color: '#424242',
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '700',
  },
  sectionBody: {
    backgroundColor: palette.white,
  },
  locationRow: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.divider,
    backgroundColor: palette.white,
  },
  locationRowSelected: {
    backgroundColor: palette.linkSoft,
  },
  locationLabel: {
    flex: 1,
    color: '#444346',
    fontSize: typography.heading,
    lineHeight: 28,
    fontWeight: '700',
  },
  locationLabelSelected: {
    color: palette.textPrimary,
  },
  optionRow: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.divider,
    backgroundColor: palette.white,
  },
  optionRowSelected: {
    backgroundColor: palette.linkSoft,
  },
  optionLabel: {
    color: palette.textPrimary,
    flex: 1,
    fontSize: typography.body + 1,
    lineHeight: 24,
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: palette.link,
    fontWeight: '700',
  },
  rowPressed: {
    backgroundColor: palette.surfaceSection,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  emptyStateLabel: {
    color: palette.textSecondary,
    fontSize: typography.heading,
    lineHeight: 28,
    textAlign: 'center',
  },
});
