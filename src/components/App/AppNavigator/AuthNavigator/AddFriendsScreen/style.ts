import { StyleSheet } from 'react-native';
import { fontFamilyRegular, fullHeight, blackTextColor } from '../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 84,
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
    width: 17.35,
    height: 17.99,
  },
  buttonWraper: {
    width: 140,
    height: 40,
  },
});

export default style;