import type { ReactNode } from 'react';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import type { IconName } from '@/shared/types/icons';

export type HeaderProps = {
  title?: string;
  titleIconName?: IconName;
  titleIconColor?: string;
  showTitleChevron?: boolean;
  onTitlePress?: () => void;
  rightIconName?: IconName;
  rightIconColor?: string;
  onRightPress?: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChangeText?: (text: string) => void;
  searchInputProps?: Omit<
    TextInputProps,
    | 'autoCapitalize'
    | 'autoCorrect'
    | 'onChangeText'
    | 'placeholder'
    | 'placeholderTextColor'
    | 'selectionColor'
    | 'style'
    | 'value'
  >;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  showSearch?: boolean;
};
