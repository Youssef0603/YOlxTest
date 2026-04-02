import React from 'react';

import type { ListingItem } from '@/features/listings/model/listing';
import { ListingRail } from '@/features/listings/ui/ListingRail';

type HomeInternationalPropertiesProps = {
  items: ListingItem[];
  onActionPress?: () => void;
};

export function HomeInternationalProperties({
  items,
  onActionPress,
}: HomeInternationalPropertiesProps) {
  if (!items.length) {
    return null;
  }

  return (
    <ListingRail
      actionLabel="See all"
      items={items}
      onActionPress={onActionPress}
      title="Apartments & Villas For Sale"
    />
  );
}
