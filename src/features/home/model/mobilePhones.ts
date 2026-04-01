import { ListingItem } from '@/features/listings/model/listing';

export const mobilePhones: ListingItem[] = [
  {
    id: 'mobile-1',
    imageSource: require('../../../assets/images/m1.webp'),
    price: 'USD 490',
    title: '13 pro',
    stats: [],
    location: 'Malaab, Beirut',
    postedAt: '7 days ago',
    accessibilityLabel: 'iPhone 13 pro for sale',
  },
  {
    id: 'mobile-2',
    imageSource: require('../../../assets/images/m2.webp'),
    price: 'USD 920',
    title: '16 Pro max 512 Gb No custom.',
    stats: [],
    location: 'Furn El Chebbak, Baabda',
    postedAt: '7 days ago',
    accessibilityLabel: 'iPhone 16 Pro Max 512 GB for sale',
  },
  {
    id: 'mobile-3',
    imageSource: require('../../../assets/images/m3.webp'),
    price: 'USD 650',
    title: '15 Pro 256 Gb',
    stats: [],
    location: 'Sin El Fil, Metn',
    postedAt: '5 days ago',
    accessibilityLabel: 'iPhone 15 Pro 256 GB for sale',
  },
];
