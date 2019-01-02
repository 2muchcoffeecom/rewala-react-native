import { Dimensions, Platform, StyleSheet } from 'react-native';
import {
  blackTextColor, borderColor, borderColorOpacity,
  fontFamilyBold, fontFamilyRegular, whiteColor,
} from '../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: whiteColor,
    width: Dimensions.get('window').width,
  },
  titleWraper: {
    paddingTop: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: borderColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        borderBottomWidth: 2,
        borderBottomColor: borderColorOpacity,
      },
    }),
  },
  button: {
    paddingBottom: 15,
    paddingTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: borderColor,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        borderBottomWidth: 1,
        borderBottomColor: borderColorOpacity,
      },
    }),
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    color: blackTextColor,
  },
  textTitle: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    color: blackTextColor,
  },
});

export default style;