import { StyleSheet } from 'react-native';
import { mainColor, greyColor, fontFamily, fullHeight } from '../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 105,
    paddingBottom: 20,
    minHeight: fullHeight,
  },
  wraper: {
    width: '100%',
    paddingLeft: 42,
    paddingRight: 42,
  },
  imageWraper: {
    marginBottom: 87,
  },
  emailWraper: {
    marginBottom: 24,
  },
  passwordWraper: {
    marginBottom: 40,
  },
  signInWraper: {
    marginBottom: 20,
  },
  singUpWraper: {
    position: 'absolute',
    bottom: 20,
  },
  image: {
    width: 204,
    height: 42,
  },
  text: {
    fontFamily,
    fontWeight: '400',
    fontSize: 11,
    color: greyColor,
    // textTransform: 'uppercase',
  },
  textLink: {
    color: mainColor,
  },
});

export default style;