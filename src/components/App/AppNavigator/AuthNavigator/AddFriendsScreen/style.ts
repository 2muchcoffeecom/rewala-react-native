import { StyleSheet } from 'react-native';
import { fontFamilyRegular, fullHeight, blackTextColor, mainColor } from '../../../../../app.style';

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
    paddingLeft: 20,
    paddingRight: 20,
  },
  seacrhWraper: {
    width: '100%',
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
    right: 7,
    top: 7,
  },
  searchDeleteButton: {
    position: 'absolute',
    right: 3,
    top: 5,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 22.46,
  },
  friendList: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  buttonWraper: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: mainColor,
  },
});

export default style;