import React from 'react';

import { internationalProperties } from '@/features/home/model/internationalProperties';
import { ListingRail } from '@/features/listings/ui/ListingRail';

export function HomeInternationalProperties() {
  return (
    <ListingRail
      actionLabel="See all"
      items={internationalProperties}
      title="International Properties"
    />
  );
}
