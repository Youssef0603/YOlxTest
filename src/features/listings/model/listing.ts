import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import type { IconName } from '@/shared/types/icons';

export type ListingStatItem = {
  id: string;
  iconName: IconName;
  value: string;
};

export type ListingItem = {
  id: string;
  imageSource: ImageSourcePropType;
  price: string;
  title: string;
  stats: ListingStatItem[];
  location: string;
  postedAt: string;
  onPress?: () => void;
  onFavoritePress?: () => void;
  accessibilityLabel?: string;
};

export type ListingCardProps = {
  item: ListingItem;
  cardWidth?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export type ListingRailProps = {
  title: string;
  items: ListingItem[];
  actionLabel?: string;
  onActionPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};
