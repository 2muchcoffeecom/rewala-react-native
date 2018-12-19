import { StyleSheet } from 'react-native';
import { mainColor, fontFamilyRegular, greyColor } from '../../../app.style';

const style = StyleSheet.create({
  text: {
    paddingTop: 10,
    paddingBottom: 10,
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