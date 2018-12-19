import { StyleSheet } from 'react-native';
import { mainColor, greyColor, fontFamilyRegular, fullHeight } from '../../../../../app.style';

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
  passwordWraper: {
    marginBottom: 16,
  },
  signInWraper: {
    height: 40,
    marginBottom: 10,
  },
  singUpWraper: {
    position: 'absolute',
    bottom: 10,
  },
  image: {
    width: 160,
    height: 33,
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 11,
    color: greyColor,
  },
  textLink: {
    color: mainColor,
  },
});

export default style;