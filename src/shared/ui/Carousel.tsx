import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { palette, spacing } from '@/app/theme';
import { CarouselItem, ImageCarouselProps } from '@/shared/types/carousel';

export function Carousel({
  items,
  slideHeightRatio = 0.34,
  showPagination = false,
  autoPlay = true,
  autoPlayInterval = 5000,
  fullWidth = false,
  fullBleed = false,
  containerStyle,
  slideStyle,
  imageStyle,
}: ImageCarouselProps) {
  const flatListRef = useRef<FlatList<CarouselItem>>(null);
  const { width: screenWidth } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemWidth = fullWidth ? screenWidth : screenWidth - spacing.lg * 2;
  const itemHeight = itemWidth * slideHeightRatio;
  const shouldAutoPlay = autoPlay && items.length > 1;

  useEffect(() => {
    if (!shouldAutoPlay) {
      return undefined;
    }

    const interval = setInterval(() => {
      const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
      flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, currentIndex, items.length, shouldAutoPlay]);

  const handleScrollEnd = (
    event: {
      nativeEvent: {
        contentOffset: {
          x: number;
        };
      };
    },
    onIndexChange: (index: number) => void,
  ) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
    onIndexChange(nextIndex);
  };

  const handleScrollToIndexFailed = (index: number) => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToIndex({ animated: true, index });
    });
  };

  const renderSlide = (item: CarouselItem) => (
    <Pressable
      accessibilityRole={item.onPress ? 'button' : 'image'}
      accessibilityLabel={item.accessibilityLabel}
      disabled={!item.onPress}
      onPress={item.onPress}
      style={[styles.slide, { height: itemHeight, width: itemWidth }, slideStyle]}>
      <Image source={item.imageSource} style={[styles.image, imageStyle]} />
    </Pressable>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={items}
        getItemLayout={(_, index) => ({
          index,
          length: itemWidth,
          offset: itemWidth * index,
        })}
        horizontal
        keyExtractor={item => item.id}
        onMomentumScrollEnd={event => handleScrollEnd(event, setCurrentIndex)}
        onScrollToIndexFailed={({ index }) => handleScrollToIndexFailed(index)}
        pagingEnabled
        renderItem={({ item }) => renderSlide(item)}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        style={[styles.list, fullBleed && styles.fullBleedList]}
      />

      {showPagination && items.length > 1 ? (
        <View style={styles.pagination}>
          {items.map((item, index) => (
            <View
              key={item.id}
              style={[styles.dot, index === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  list: {
    flexGrow: 0,
  },
  fullBleedList: {
    marginHorizontal: -spacing.lg,
  },
  slide: {
    overflow: 'hidden',
    borderRadius: 14,
    backgroundColor: palette.surfaceMuted,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.borderNeutral,
  },
  dotActive: {
    width: 22,
    backgroundColor: palette.accent,
  },
});
