import type { ComponentProps } from 'react';
import type MaterialIcons from '@react-native-vector-icons/material-icons';
import { ViewStyle } from 'react-native';

export const ICON_TYPE = {
  icon: 'icon',
  image: 'image',
  svg: 'svg',
} as const;

export type IconType = (typeof ICON_TYPE)[keyof typeof ICON_TYPE];

export type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

export enum ICONS {
  HOME = 'HomeOutlined',
  HOME_FILLED = 'Home',
  CHAT_OUTLINE = 'ChatOutlined',
  CHAT_BUBBLE = 'Chat',
  MENU = 'Menu',
  MENU_OUTLINE = 'MenuOutlined',
  ADD = 'add',
  ADD_CIRCLE = 'add-circle',
  ADD_CIRCLE_OUTLINE = 'add-circle-outline',
  DASHBOARD = 'dashboard',
  DASHBOARD_CUSTOMIZE = 'dashboard-customize',
  SPACE_DASHBOARD = 'space-dashboard',
  PERSON = 'person',
  PERSON_OUTLINE = 'person-outline',
}

export type IconName = ICONS | MaterialIconName;

export type IconProps = {
  name?: IconName;
  type?: IconType;
  size?: number;
  color?: string;
  onPress?: () => void;
  testID?: string;
  containerStyle?: ViewStyle;
  showRedDot?: boolean;
};
