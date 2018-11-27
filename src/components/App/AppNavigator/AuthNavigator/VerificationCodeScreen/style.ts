import { StyleSheet } from 'react-native';
import { mainColor, greyColor, fontFamily, fullHeight } from '../../../../../app.style';

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
    marginBottom: 20,
  },
  loginWraper: {
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
  textCheckEmail: {
    fontSize: 12,
  },
  textLink: {
    color: mainColor,
  },
});

export default style;