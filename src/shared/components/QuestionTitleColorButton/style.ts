import { StyleSheet } from 'react-native';
import { whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  button: {
    width: 18,
    height: 18,
    borderColor: whiteColor,
    borderWidth: 1,
    borderRadius: 9,
  },
  buttonActive: {
    width: 24,
    height: 24,
    borderColor: whiteColor,
    borderWidth: 1,
    borderRadius: 12,
  },
});

export default style;