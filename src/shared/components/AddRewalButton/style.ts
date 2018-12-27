import { Platform, StyleSheet } from 'react-native';
import { shadowColor } from '../../../app.style';

const style = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  addButton: {
    position: 'absolute',
    bottom: 26,
    right: 18,
    width: 50,
    height: 50,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default style;