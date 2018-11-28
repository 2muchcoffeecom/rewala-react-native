import { StyleSheet } from 'react-native';
import { fullHeight } from '../../../../../app.style';

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
  passwordConfirmWraper: {
    marginBottom: 16,
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