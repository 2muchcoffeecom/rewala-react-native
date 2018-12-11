import { StyleSheet } from 'react-native';
import { blackTextColor, fontFamilyRegular, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24,24,24,0.74)',
  },
  modalContainer: {
    width: 292,
    height: 376,
    backgroundColor: whiteColor,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 16,
    color: blackTextColor,
  },
});

export default style;