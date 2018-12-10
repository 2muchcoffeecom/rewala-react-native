import { Platform, StyleSheet } from 'react-native';
import {
  mainColor,
  fontFamilyBold,
  whiteColor,
  fontFamilyRegular,
  blackColor,
  greyColor,
  borderColor,
} from '../../../app.style';

const style = StyleSheet.create({
  root: {flex: 1},
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: whiteColor,
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
  label: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 11,
    color: greyColor,
  },
  activeLabel: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 11,
    color: blackColor,
  },
  button: {
    justifyContent: 'center',
    height: '100%',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: mainColor,
  },
  content: {
  },
});

export default style;