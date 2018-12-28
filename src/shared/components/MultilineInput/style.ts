import { StyleSheet } from 'react-native';
import { whiteColor, fontFamilyBold } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    width: '100%',
    height: '100%',
    fontSize: 18,
    lineHeight: 20,
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    textAlign: 'center',
    color: whiteColor,
  },
});

export default style;