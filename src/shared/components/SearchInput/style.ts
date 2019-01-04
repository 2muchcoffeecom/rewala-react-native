import { StyleSheet } from 'react-native';
import { fontFamilyRegular, blackTextColor } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    width: '100%',
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
});

export default style;