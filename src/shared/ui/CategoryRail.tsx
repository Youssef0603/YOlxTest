import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { spacing, typography } from '@/app/theme';
import { CategoryRailProps } from '@/shared/types/category';
import { CategoryCard } from '@/shared/ui/CategoryCard';
import { SectionHeader } from '@/shared/ui/SectionHeader';

export function CategoryRail({
  title,
  items,
  actionLabel,
  onActionPress,
  containerStyle,
}: CategoryRailProps) {
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
        renderItem={({ item }) => <CategoryCard item={item} />}
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
    fontWeight: '800',
    lineHeight: 28,
  },
  action: {
    fontSize: typography.body,
    fontWeight: '700',
    lineHeight: 22,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
  },
  separator: {
    width: spacing.md,
  },
});
