import { StyleSheet } from 'react-native';
import { fontFamilyRegular, errorColor } from '../../../app.style';

const style = StyleSheet.create({
  textError: {
    position: 'absolute',
    top: -35,
    left: 42,
    right: 42,
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 11,
    color: errorColor,
    textAlign: 'center',
  },
});

export default style;