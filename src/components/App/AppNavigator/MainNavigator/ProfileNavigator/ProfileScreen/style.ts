import { Platform, StyleSheet } from 'react-native';
import {
  fontFamilyRegular, fontFamilyBold, blackTextColor, blackColor, borderColor, borderColorOpacity, fullHeight,
} from '../../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: fullHeight - 89,
  },
  meInfo: {
    // marginTop: 49,
    ...Platform.select({
      ios: {
        shadowColor: borderColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        // elevation: 2,
        borderBottomWidth: 2,
        borderBottomColor: borderColorOpacity,
      },
    }),
  },
  wraperMe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 113,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 29,
    paddingTop: 16,
    paddingBottom: 17,
  },
  meName: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    color: blackColor,
  },
  meNameWraper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 49,
  },
  avatarWraper: {
  },
  textAndButtonWraper: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  textWraper: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  image: {
    width: 80,
    height: 80,
  },
  buttonSettingsWraper: {
    width: 128,
    height: 32,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    color: blackTextColor,
  },
  buttonFriend: {
    marginRight: 13,
  },
  textBold: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
  },
});

export default style;