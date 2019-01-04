import { StyleSheet } from 'react-native';
import { fontFamilyBold, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
  },
  deletePhotoButton: {
    justifyContent: 'center',
    width: 87,
  },
  text: {
    marginRight: 7,
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 9,
    color: whiteColor,
  },
  textDelete: {
    marginRight: 0,
  },
});

export default style;