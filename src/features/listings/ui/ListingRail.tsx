import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { spacing, typography } from '@/app/theme';
import { ListingRailProps } from '@/features/listings/model/listing';
import { SectionHeader } from '@/shared/ui/SectionHeader';

import { ListingCard } from './ListingCard';

export function ListingRail({
  title,
  items,
  actionLabel,
  onActionPress,
  containerStyle,
}: ListingRailProps) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = (screenWidth - spacing.lg - spacing.md) / 1.75;

  return (
    <View style={[styles.container, containerStyle]}>
      <SectionHeader
        actionLabel={actionLabel}
        actionStyle={styles.action}
        containerStyle={styles.header}
        onActionPress={onActionPress}
        title={title}
        titleStyle={styles.title}
      />

      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        horizontal
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ListingCard cardWidth={cardWidth} item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.heading,
    lineHeight: 32,
    fontWeight: '800',
  },
  action: {
    fontSize: typography.body + 1,
    lineHeight: 22,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  separator: {
    width: spacing.md,
  },
});
