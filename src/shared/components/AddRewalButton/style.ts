import { Platform, StyleSheet } from 'react-native';
import { shadowColor } from '../../../app.style';

const style = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonWraper: {
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
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default style;