import { Dimensions, TextStyle, ViewStyle } from 'react-native';

export const whiteColor = '#FFFFFF';
export const greyColor = '#9D9D9D';
export const greyColorAddRewal = '#A9A9A9';
export const greyColorIcon = '#BEBEBE';
export const greyColorText = '#7D7D7D';
export const blackTextColor = '#000';
export const mainColor = '#708EFF';
export const blackColor = '#1C1C1C';
export const blackModalColor = '#181818';
export const shadowColor = '#CCCBCB';
export const errorColor = '#FF7575';
export const backgroundColor = '#F2F2F2';
export const errorBorderColor = 'rgba(255, 117, 117, 0.5)';
export const borderColor = '#B2B2B2';
export const borderColorOpacity = 'rgba(117, 117, 117, 0.5)';
export const modalBackgroundColorOpacity = 'rgba(24, 24 , 24, 0.74)';
export const linearGradientColors = ['#7FB2FD', '#5D70FF'];

export enum QuestionOptionsColor {
  Option1 = '#708EFF',
  Option2 = '#F67B7B',
  Option3 = '#F0D12E',
  Option4 = '#0ABA7F',
  Option5 = '#7A44FA',
  Option6 = '#BD10E0',
  Option7 = '#F5A623',
}

export const questionTitleColor = [
  '#FFFFFF',
  '#1C1C1C',
  '#708EFF',
  '#F67B7B',
  '#F0D12E',
  '#09BA7E',
  '#B543FF',
];

export const fontFamilyRegular = 'Lato-Regular';
export const fontFamilyBold = 'Lato-Bold';

export const headerTitleStyle: TextStyle = {
  fontFamily: fontFamilyBold,
  fontWeight: '700',
  fontSize: 16,
  color: blackColor,
  alignSelf: 'center',
};

export const headerStyle: ViewStyle = {
  height: 49,
  width: '100%',
  backgroundColor: whiteColor,
  borderBottomWidth: 0.5,
  borderBottomColor: 'rgba(0, 0, 0, 0.25)',
};

export const headerTitleContainerStyle: ViewStyle = {
  position: 'absolute',
  left: 0,
  justifyContent: 'center',
  width: '100%',
};

const deviceHeight = Dimensions.get('window').height;
export const fullWidth = Dimensions.get('window').width - 20;
export const fullHeight = (deviceHeight - 25) < 638 ? 638 : deviceHeight - 25;