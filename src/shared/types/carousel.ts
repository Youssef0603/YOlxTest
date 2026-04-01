import type { ImageSourcePropType, ImageStyle, StyleProp, ViewStyle } from 'react-native';

export type CarouselItem = {
  id: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
  accessibilityLabel?: string;
};

export type ImageCarouselProps = {
  items: CarouselItem[];
  slideHeightRatio?: number;
  showPagination?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  fullWidth?: boolean;
  fullBleed?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  slideStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};
