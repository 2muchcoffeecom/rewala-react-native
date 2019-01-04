import { StyleSheet } from 'react-native';
import { fontFamilyRegular, blackTextColor, fullHeight } from '../../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 9,
    minHeight: fullHeight - 40,
  },
  seacrhWraper: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: 'rgba(0, 0, 0, 0.25)',
    marginBottom: 20,
  },
  wraper: {
    alignItems: 'center',
    width: '100%',
  },
  friendList: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 40,
  },
  emptyText: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'center',
    color: blackTextColor,
  },
});

export default style;