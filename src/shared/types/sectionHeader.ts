import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  actionStyle?: StyleProp<TextStyle>;
  eyebrowStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};
