import React from 'react';
import { StyleSheet } from 'react-native';

import { spacing } from '@/app/theme';
import { homeCategoryItems } from '@/features/home/model/categoryItems';
import { CategoryRail } from '@/shared/ui/CategoryRail';

export function HomeCategories() {
  return (
    <CategoryRail
      actionLabel="See all"
      items={homeCategoryItems}
      title="All categories"
    />
  );
}
