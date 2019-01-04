import { StyleSheet } from 'react-native';
import { mainColor } from '../../../app.style';

const style = StyleSheet.create({
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default style;