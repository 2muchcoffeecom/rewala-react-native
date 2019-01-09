import { Dimensions, StyleSheet } from 'react-native';
import { fontFamilyBold, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  bgImageContainer: {
    width: '100%',
    minHeight: Dimensions.get('window').width * 0.5333,
    marginBottom: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Dimensions.get('window').width,
  },
  backgroundFullScreen: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: '100%',
    minHeight: Dimensions.get('window').width * 0.5333,
  },
  textTitle: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 18,
    color: whiteColor,
  },
});

export default style;