import { StyleSheet } from 'react-native';
import { greyColorText, fontFamilyRegular, backgroundColor } from '../../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 115,
    backgroundColor,
  },
  wraper: {
    alignItems: 'center',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  imageWraper: {
    marginBottom: 37,
  },
  textWraper: {
    width: 200,
  },
  image: {
    width: 332,
    height: 263,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center',
    color: greyColorText,
  },
});

export default style;