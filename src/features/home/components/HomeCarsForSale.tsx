import React from 'react';

import { carsForSale } from '@/features/home/model/carsForSale';
import { ListingRail } from '@/features/listings/ui/ListingRail';

export function HomeCarsForSale() {
  return (
    <ListingRail
      actionLabel="See all"
      items={carsForSale}
      title="Cars for Sale"
    />
  );
}
