import { Dimensions, TextStyle, ViewStyle } from 'react-native';

export const whiteColor = '#FFF';
export const greyColor = '#9D9D9D';
export const greyColorText = '#7D7D7D';
export const blackTextColor = '#000';
export const mainColor = '#708EFF';
export const blackColor = '#1C1C1C';
export const shadowColor = '#CCCBCB';
export const errorColor = '#FF7575';
export const backgroundColor = '#F2F2F2';
export const errorBorderColor = 'rgba(255, 117, 117, 0.5)';
export const borderColor = '#B2B2B2';
export const borderColorOpacity = 'rgba(117, 117, 117, 0.5)';

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