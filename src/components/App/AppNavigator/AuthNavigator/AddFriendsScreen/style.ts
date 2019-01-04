import { StyleSheet } from 'react-native';
import { fullHeight, mainColor } from '../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    height: fullHeight - 40,
    marginTop: 49,
  },
  scrollContainer: {
    paddingBottom: 30,
    minHeight: fullHeight - 89,
  },
  wraper: {
    alignItems: 'center',
    width: '100%',
  },
  seacrhWraper: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  friendList: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
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