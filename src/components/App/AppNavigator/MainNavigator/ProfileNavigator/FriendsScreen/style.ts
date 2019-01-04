import { StyleSheet } from 'react-native';
import { fullHeight } from '../../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    marginTop: 49,
    minHeight: fullHeight - 49,
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
});

export default style;