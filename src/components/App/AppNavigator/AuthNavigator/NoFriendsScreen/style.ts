import { StyleSheet } from 'react-native';
import { greyColorNoFriend, fontFamilyRegular, fullHeight } from '../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 94,
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
    color: greyColorNoFriend,
  },
  buttonWraper: {
    height: 40,
    width: 150,
  },
});

export default style;