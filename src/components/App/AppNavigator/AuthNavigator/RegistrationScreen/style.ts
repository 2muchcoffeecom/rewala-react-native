import { Platform, StyleSheet } from 'react-native';
import { fontFamilyRegular, fullHeight, shadowColor, blackTextColor } from '../../../../../app.style';

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
    fontFamily: fontFamilyRegular,
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
  passwordConfirmWraper: {
    marginBottom: 16,
  },
  buttonWraper: {
    height: 40,
  },
  logInWraper: {
    position: 'absolute',
    bottom: 20,
  },
  image: {
    width: 160,
    height: 33,
  },
});

export default style;