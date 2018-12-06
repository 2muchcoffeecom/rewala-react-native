import { StyleSheet } from 'react-native';
import {
  fontFamilyRegular, fontFamilyBold, blackTextColor, blackColor,
} from '../../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    paddingTop: 17,
  },
  meInfo: {},
  wraperMe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
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
    marginBottom: 12,
  },
  avatarWraper: {
    marginBottom: 37,
  },
  textWraper: {
    // width: 200,
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
  textBold: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
  },
});

export default style;