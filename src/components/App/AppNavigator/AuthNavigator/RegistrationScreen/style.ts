import { Platform, StyleSheet } from 'react-native';
import {
  mainColor, greyColor, fontFamily, fullHeight, shadowColor, blackTextColor
} from '../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 95,
    paddingBottom: 20,
    minHeight: fullHeight,
  },
  wraper: {
    width: '100%',
    paddingLeft: 42,
    paddingRight: 42,
  },
  imageWraper: {
    marginBottom: 60,
  },
  phoneWraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 64,
  },
  countryPickerWraper: {
    left: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: 76,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 8,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  countryPickerText: {
    fontFamily,
    fontWeight: '400',
    fontSize: 12,
    color: blackTextColor,
  },
  countryPickerImg: {
    width: 20,
    height: 13.3,
    marginTop: -2,
  },
  phoneField: {
    flex: 1,
  },
  fieldWraper: {
    // marginBottom: 16,
  },
  passwordConfirmWraper: {
    marginBottom: 16,
  },
  singInWraper: {
    position: 'absolute',
    bottom: 20,
  },
  image: {
    width: 160,
    height: 33,
  },
  text: {
    fontFamily,
    fontWeight: '400',
    fontSize: 11,
    color: greyColor,
  },
  textLink: {
    color: mainColor,
  },
});

export default style;