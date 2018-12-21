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
  textCheckEmailWraper: {
    marginBottom: 41,
  },
  changePasswordWraper: {
    height: 40,
    marginBottom: 10,
  },
  loginWraper: {
    position: 'absolute',
    bottom: 10,
  },
  image: {
    width: 160,
    height: 33,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    color: greyColor,
  },
  textLink: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 11,
    color: mainColor,
  },
});

export default style;