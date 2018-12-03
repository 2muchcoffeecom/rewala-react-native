import { StyleSheet } from 'react-native';
import { mainColor, fontFamilyBold, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderRadius: 4,
    backgroundColor: mainColor,
  },
  container: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
  },
  buttonTitle: {
    fontFamily: fontFamilyBold,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
    color: whiteColor,
  },
  disabled: {
    opacity: 0.2,
  },
});

export default style;