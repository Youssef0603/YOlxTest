import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from '@/app/navigation/rootTypes';
import { spacing } from '@/app/theme';
import { HomeCarsForSale } from '@/features/home/components/HomeCarsForSale';
import { HomeCategories } from '@/features/home/components/HomeCategories';
import { HomeCarousel } from '@/features/home/components/HomeCarousel';
import { Header } from '@/features/home/components/Header';
import { HomeInternationalProperties } from '@/features/home/components/HomeInternationalProperties';
import { HomeMobilePhones } from '@/features/home/components/HomeMobilePhones';
import { useHomeScreenData } from '@/features/home/hooks/useHomeScreenData';
import { SEARCH_RESULTS_CATEGORIES } from '@/features/search/model/searchResults';
import { Screen } from '@/shared/ui/Screen';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { i18n } = useTranslation();
  const {
    apartmentsAndVillasForSale,
    carsForSale,
    categories,
    error,
    mobilePhones,
  } = useHomeScreenData(i18n.language);

  return (
    <Screen>
      <View style={styles.container}>
        <Header />

        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: spacing.xxl },
          ]}
          showsVerticalScrollIndicator={false}
          style={styles.scroll}>
          <HomeCarousel />
          <HomeCategories
            items={categories}
            onActionPress={() => navigation.navigate('Search')}
          />
          <HomeInternationalProperties
            items={apartmentsAndVillasForSale}
            onActionPress={() =>
              navigation.navigate('SearchResults', {
                category: SEARCH_RESULTS_CATEGORIES.APARTMENTS_VILLAS_FOR_SALE,
              })
            }
          />
          <HomeCarsForSale
            items={carsForSale}
            onActionPress={() =>
              navigation.navigate('SearchResults', {
                category: SEARCH_RESULTS_CATEGORIES.CARS_FOR_SALE,
              })
            }
          />
          <HomeMobilePhones
            items={mobilePhones}
            onActionPress={() =>
              navigation.navigate('SearchResults', {
                category: SEARCH_RESULTS_CATEGORIES.MOBILE_PHONES,
              })
            }
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    gap: spacing.lg,
  },
  errorText: {
    paddingHorizontal: spacing.lg,
  },
});
