import React from 'react';

import type { CategoryItem } from '@/shared/types/category';
import { CategoryRail } from '@/shared/ui/CategoryRail';

type HomeCategoriesProps = {
  items: CategoryItem[];
  onActionPress?: () => void;
};

export function HomeCategories({
  items,
  onActionPress,
}: HomeCategoriesProps) {
  if (!items.length) {
    return null;
  }

  return (
    <CategoryRail
      actionLabel="See all"
      items={items}
      onActionPress={onActionPress}
      title="All categories"
    />
  );
}
