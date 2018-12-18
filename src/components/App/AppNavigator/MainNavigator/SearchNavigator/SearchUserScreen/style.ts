import { StyleSheet } from 'react-native';
import { fontFamilyRegular, fullHeight, blackTextColor } from '../../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 9,
    minHeight: fullHeight,
  },
  wraper: {
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
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
    width: 17.35,
    height: 17.99,
  },
  searchDeleteButton: {
    position: 'absolute',
    right: 30,
    top: 12,
    zIndex: 100,
  },
  searchCrossImage: {
    width: 10,
    height: 9.23,
  },
  friendList: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
});

export default style;