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
    marginLeft: 0,
    marginRight: 0,
  },
  buttonTitle: {
    fontFamily: fontFamilyBold,
    fontSize: 14,
    fontWeight: '700',
    color: whiteColor,
  },
  disabled: {
    opacity: 0.2,
  },
});

export default style;