import { Dimensions, TextStyle } from 'react-native';

export const whiteColor = '#FFF';
export const greyColor = '#9D9D9D';
export const mainColor = '#708EFF';
export const blackColor = '#1C1C1C';
export const shadowColor = '#CCCBCB';
export const errorColor = '#FF0000';

export const fontFamily = 'Lato';

export const headerTitleStyle: TextStyle = {
  fontFamily,
  fontWeight: '400',
  fontSize: 17,
  color: blackColor,
  alignSelf: 'center',
};

export const fullWidth = Dimensions.get('window').width - 20;
export const fullHeight = Dimensions.get('window').height - 25;