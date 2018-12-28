import { StyleSheet, Platform } from 'react-native';

const style = StyleSheet.create({
  tabStyle: {
    height: 40,
  },
  style: {
    height: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#E0E0E0',
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        borderTopWidth: 0,
      },
      android: {
        borderTopWidth: 0.5,
        borderBottomColor: 'rgba(224, 224, 224, 0.5)',
      },
    }),
  },
});

export default style;