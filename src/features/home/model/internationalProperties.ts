import { ListingItem } from '@/features/listings/model/listing';

export const internationalProperties: ListingItem[] = [
  {
    id: 'intl-property-1',
    imageSource: require('../../../assets/images/p1.webp'),
    price: 'USD 235,000',
    title: 'Duplex 6P 114m² Terrasse - Lyon',
    stats: [
      { id: 'beds', iconName: 'hotel', value: '4' },
      { id: 'baths', iconName: 'bathtub', value: '3' },
      { id: 'area', iconName: 'square-foot', value: '114 m²' },
    ],
    location: 'Lyon, France',
    postedAt: '6 days ago',
    accessibilityLabel: 'International property in Lyon, France',
  },
  {
    id: 'intl-property-2',
    imageSource: require('../../../assets/images/p2.webp'),
    price: 'USD 975,000',
    title: 'PARIS, Appartement lumineux avec balcon',
    stats: [
      { id: 'beds', iconName: 'hotel', value: '2' },
      { id: 'baths', iconName: 'bathtub', value: '2' },
      { id: 'area', iconName: 'square-foot', value: '65 m²' },
    ],
    location: 'Paris, France',
    postedAt: '6 days ago',
    accessibilityLabel: 'International property in Paris, France',
  },
  {
    id: 'intl-property-3',
    imageSource: require('../../../assets/images/p3.webp'),
    price: 'USD 420,000',
    title: 'Modern seaside apartment with open living area',
    stats: [
      { id: 'beds', iconName: 'hotel', value: '3' },
      { id: 'baths', iconName: 'bathtub', value: '2' },
      { id: 'area', iconName: 'square-foot', value: '92 m²' },
    ],
    location: 'Barcelona, Spain',
    postedAt: '3 days ago',
    accessibilityLabel: 'International property in Barcelona, Spain',
  },
];
