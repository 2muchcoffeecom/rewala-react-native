import { Platform, StyleSheet } from 'react-native';
import { borderColor, fontFamilyRegular, mainColor, whiteColor } from '../../../../../../../app.style';

const style = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: whiteColor,
    height: 40,
    ...Platform.select({
      ios: {
        shadowColor: borderColor,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 0.25,
      },
    }),
  },
  textLabel: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 11,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: mainColor,
  },
});

export default style;