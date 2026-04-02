import React from 'react';

import type { ListingItem } from '@/features/listings/model/listing';
import { ListingRail } from '@/features/listings/ui/ListingRail';

type HomeCarsForSaleProps = {
  items: ListingItem[];
  onActionPress?: () => void;
};

export function HomeCarsForSale({
  items,
  onActionPress,
}: HomeCarsForSaleProps) {
  if (!items.length) {
    return null;
  }

  return (
    <ListingRail
      actionLabel="See all"
      items={items}
      onActionPress={onActionPress}
      title="Cars for Sale"
    />
  );
}
