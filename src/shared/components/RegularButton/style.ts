import { StyleSheet } from 'react-native';
import { mainColor, fontFamily, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderRadius: 4,
    backgroundColor: mainColor,
  },
  buttonTitle: {
    fontFamily,
    fontSize: 14,
    fontWeight: '700',
    // textTransform: 'uppercase',
    color: whiteColor,
  },
  disabled: {
    opacity: 0.2,
  },
});

export default style;