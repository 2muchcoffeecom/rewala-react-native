import { StyleSheet } from 'react-native';
import { mainColor, fontFamilyBold, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 4,
    borderRadius: 4,
    backgroundColor: mainColor,
  },
  buttonInverted: {
    borderWidth: 1,
    borderColor: mainColor,
    borderStyle: 'solid',
    backgroundColor: whiteColor,
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
  buttonTitleInverted: {
    color: mainColor,
  },
  disabled: {
    opacity: 0.2,
  },
});

export default style;