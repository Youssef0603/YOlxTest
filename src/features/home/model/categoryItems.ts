import { CategoryItem } from '@/shared/types/category';

export const homeCategoryItems: CategoryItem[] = [
  {
    id: 'vehicles',
    label: 'Vehicles',
    imageSource: require('../../../assets/images/vehicles.png'),
    accessibilityLabel: 'Vehicles category',
  },
  {
    id: 'properties',
    label: 'Properties',
    imageSource: require('../../../assets/images/property.png'),
    accessibilityLabel: 'Properties category',
  },
  {
    id: 'mobiles-accessories',
    label: 'Mobiles & Accessories',
    imageSource: require('../../../assets/images/mobile-phones-accessories.png'),
    accessibilityLabel: 'Mobiles and accessories category',
  },
  {
    id: 'electronics-home-appliances',
    label: 'Electronics & Home Appliances',
    imageSource: require('../../../assets/images/electronics-home-appliances.png'),
    accessibilityLabel: 'Electronics and home appliances category',
  },
  {
    id: 'furniture-decor',
    label: 'Furniture & Decor',
    imageSource: require('../../../assets/images/home-furniture-decor.png'),
    accessibilityLabel: 'Furniture and decor category',
  },
  {
    id: 'businesses-industrial',
    label: 'Businesses & Industrial',
    imageSource: require('../../../assets/images/business-industrial.png'),
    accessibilityLabel: 'Businesses and industrial category',
  },
];
