import { StyleSheet } from 'react-native';
import { mainColor, fontFamilyRegular, greyColor } from '../../../app.style';

const style = StyleSheet.create({
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 11,
    color: greyColor,
  },
  textLink: {
    color: mainColor,
  },
});

export default style;