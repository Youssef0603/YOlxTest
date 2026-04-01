import { ListingItem } from '@/features/listings/model/listing';

export const carsForSale: ListingItem[] = [
  {
    id: 'car-1',
    imageSource: require('../../../assets/images/v1.webp'),
    price: 'USD 20,500',
    title: 'Mercedes-Benz C-Class 2016',
    stats: [{ id: 'vehicle-meta', iconName: 'speed', value: '2016 - 34000 km' }],
    location: 'Baabda Town, Baabda',
    postedAt: '12 days ago',
    accessibilityLabel: 'Mercedes-Benz C-Class 2016 for sale',
  },
  {
    id: 'car-2',
    imageSource: require('../../../assets/images/v2.webp'),
    price: 'USD 42,000',
    title: 'Mercedes-Benz E-Class 400 2018',
    stats: [{ id: 'vehicle-meta', iconName: 'speed', value: '2018 - 31000 km' }],
    location: 'Downtown, Beirut',
    postedAt: '12 days ago',
    accessibilityLabel: 'Mercedes-Benz E-Class 400 2018 for sale',
  },
  {
    id: 'car-3',
    imageSource: require('../../../assets/images/v3.webp'),
    price: 'USD 31,500',
    title: 'Mercedes-Benz GLC 300 Coupe 2020',
    stats: [{ id: 'vehicle-meta', iconName: 'speed', value: '2020 - 18000 km' }],
    location: 'Hazmieh, Baabda',
    postedAt: '9 days ago',
    accessibilityLabel: 'Mercedes-Benz GLC 300 Coupe 2020 for sale',
  },
];
