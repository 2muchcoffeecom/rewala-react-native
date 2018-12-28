import { StyleSheet } from 'react-native';
import { fontFamilyRegular, blackTextColor, fullHeight } from '../../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 9,
    minHeight: fullHeight - 40,
  },
  wraper: {
    alignItems: 'center',
    width: '100%',
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
  searchInput: {
    width: '100%',
    height: 32,
    paddingLeft: 10,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'solid',
    borderRadius: 4,
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 13,
    color: blackTextColor,
  },
  searchImage: {
    position: 'absolute',
    right: 27,
    top: 7,
  },
  searchDeleteButton: {
    position: 'absolute',
    right: 23,
    top: 5,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 22.46,
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