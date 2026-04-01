import type {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type CategoryItem = {
  id: string;
  label: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
  accessibilityLabel?: string;
};

export type CategoryCardProps = {
  item: CategoryItem;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export type CategoryRailProps = {
  title: string;
  items: CategoryItem[];
  actionLabel?: string;
  onActionPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};
