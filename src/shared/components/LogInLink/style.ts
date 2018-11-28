import { StyleSheet } from 'react-native';
import { mainColor, fontFamily, greyColor } from '../../../app.style';

const style = StyleSheet.create({
  text: {
    fontFamily,
    fontWeight: '400',
    fontSize: 11,
    color: greyColor,
  },
  textLink: {
    color: mainColor,
  },
});

export default style;