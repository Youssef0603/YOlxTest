import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { spacing } from '@/app/theme';
import { HomeCarsForSale } from '@/features/home/components/HomeCarsForSale';
import { HomeCategories } from '@/features/home/components/HomeCategories';
import { HomeCarousel } from '@/features/home/components/HomeCarousel';
import { Header } from '@/features/home/components/Header';
import { HomeInternationalProperties } from '@/features/home/components/HomeInternationalProperties';
import { HomeMobilePhones } from '@/features/home/components/HomeMobilePhones';
import { Screen } from '@/shared/ui/Screen';

export function HomeScreen() {
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
          <HomeCategories />
          <HomeInternationalProperties />
          <HomeCarsForSale />
          <HomeMobilePhones />
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
});
