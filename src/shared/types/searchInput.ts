import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type SearchInputTextProps = Omit<
  TextInputProps,
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'autoFocus'
  | 'editable'
  | 'onBlur'
  | 'onChangeText'
  | 'onFocus'
  | 'placeholder'
  | 'placeholderTextColor'
  | 'selectionColor'
  | 'style'
  | 'value'
>;

export type SearchInputProps = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  editable?: boolean;
  autoFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputProps?: SearchInputTextProps;
};
