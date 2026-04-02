import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { IconName } from '@/shared/types/icons';
import type { SearchInputTextProps } from '@/shared/types/searchInput';

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
  onSearchPress?: () => void;
  searchEditable?: boolean;
  searchAutoFocus?: boolean;
  searchInputProps?: SearchInputTextProps;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  showRightPlaceholder?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  showSearch?: boolean;
};
