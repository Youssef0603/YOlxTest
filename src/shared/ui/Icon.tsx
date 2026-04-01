import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import  MaterialIcons  from '@react-native-vector-icons/material-icons';
import { iconSize, palette } from '@/app/theme';
import * as Icons from '@/assets/svgs';
import { IconProps, ICON_TYPE } from '@/shared/types/icons';

const imageIcons: Record<string, number> = {};

export const Icon: FC<IconProps> = ({
  name,
  type = ICON_TYPE.icon,
  size = iconSize,
  color = palette.textPrimary,
  onPress,
  testID,
  containerStyle,
  showRedDot,
}) => {
  if (!name) {
    return null;
  }

  const svgIconProps = {
    width: size,
    height: size,
    fill: 'currentColor',
    color,
  };

  let children = null;

  if (type === ICON_TYPE.svg) {
    const SvgIcon = Icons[name as keyof typeof Icons];
    children = SvgIcon ? <SvgIcon {...svgIconProps} /> : null;
  } else if (type === ICON_TYPE.image) {
    const imageSource = imageIcons[name as keyof typeof imageIcons];

    children = imageSource ? (
      <Image
        source={imageSource}
        style={[styles.image, { width: size, height: size }]}
      />
    ) : null;
  } else {
    const materialIconName =
      name as React.ComponentProps<typeof MaterialIcons>['name'];

    children = (
      <MaterialIcons
        color={color}
        name={materialIconName}
        onPress={onPress}
        size={size}
      />
    );
  }

  return (
    <View>
      {showRedDot ? <View style={styles.redDot} /> : null}
      <View style={containerStyle} testID={testID}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  redDot: {
    backgroundColor: '#ff4d4d',
    width: 10,
    height: 10,
    zIndex: 10,
    borderRadius: 20,
    position: 'absolute',
    left: 35,
  },
  image: {
    resizeMode: 'cover',
  },
});
