import { StyleSheet } from 'react-native';
import { greyColorText, fontFamilyRegular, fullHeight, mainColor } from '../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 69,
    minHeight: fullHeight,
  },
  wraper: {
    alignItems: 'center',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  imageWraper: {
    marginBottom: 65,
  },
  textWraper: {
    width: 210,
    marginBottom: 30,
  },
  image: {
    width: 294,
    height: 241,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center',
    color: greyColorText,
  },
  buttonWraper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: mainColor,
  },
});

export default style;