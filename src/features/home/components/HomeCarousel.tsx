import React from 'react';
import { StyleSheet } from 'react-native';

import { spacing } from '@/app/theme';
import { homeCarouselItems } from '@/features/home/model/carouselItems';
import { Carousel } from '@/shared/ui/Carousel';

export function HomeCarousel() {
  return (
    <Carousel
      containerStyle={styles.container}
      fullBleed
      fullWidth
      items={homeCarouselItems}
      showPagination={false}
      slideHeightRatio={0.365}
      slideStyle={styles.slide}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  slide: {
    borderRadius: 0,
  },
});
