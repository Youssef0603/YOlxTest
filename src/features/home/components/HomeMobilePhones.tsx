import React from 'react';

import { mobilePhones } from '@/features/home/model/mobilePhones';
import { ListingRail } from '@/features/listings/ui/ListingRail';

export function HomeMobilePhones() {
  return (
    <ListingRail
      actionLabel="See all"
      items={mobilePhones}
      title="Mobile Phones"
    />
  );
}
