import { StyleSheet } from 'react-native';
import { blackTextColor, fontFamilyRegular, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24,24,24,0.74)',
  },
  modalContainer: {
    width: 292,
    height: 376,
    backgroundColor: whiteColor,
    borderRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 13,
    right: 13,
  },
  image: {
    width: 15,
    height: 15,
  },
  text: {
    marginTop: 36,
    marginBottom: 29,
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    color: blackTextColor,
  },
  fieldsWraper: {
    paddingLeft: 21,
    paddingRight: 21,
  },
  passwordConfirmWraper: {
    marginBottom: 26,
  },
  buttonWraper: {
    alignSelf: 'center',
    width: 160,
    height: 40,
  },
});

export default style;