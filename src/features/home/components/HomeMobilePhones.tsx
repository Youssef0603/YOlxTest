import React from 'react';

import type { ListingItem } from '@/features/listings/model/listing';
import { ListingRail } from '@/features/listings/ui/ListingRail';

type HomeMobilePhonesProps = {
  items: ListingItem[];
  onActionPress?: () => void;
};

export function HomeMobilePhones({
  items,
  onActionPress,
}: HomeMobilePhonesProps) {
  if (!items.length) {
    return null;
  }

  return (
    <ListingRail
      actionLabel="See all"
      items={items}
      onActionPress={onActionPress}
      title="Mobile Phones"
    />
  );
}
