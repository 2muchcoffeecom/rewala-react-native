import { Platform, StyleSheet } from 'react-native';
import {
  whiteColor, modalBackgroundColorOpacity, fontFamilyRegular,
  mainColor, borderColor, borderColorOpacity,
} from '../../../app.style';

const style = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: modalBackgroundColorOpacity,
  },
  modalContainer: {
    width: '84%',
    height: 488,
    paddingTop: 52,
    backgroundColor: whiteColor,
    borderRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 13,
    right: 13,
  },
  searchWraper: {
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 20,
  },
  selectAllButton: {
    alignSelf: 'flex-end',
    marginRight: 42,
    marginBottom: 9,
  },
  friendList: {
    height: '100%',
    paddingRight: 43,
    paddingLeft: 20,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 13,
    color: mainColor,
  },
  buttonWraper: {
    alignSelf: 'center',
    width: 120,
    height: 32,
  },
  buttonContainer: {
    height: 82,
    paddingTop: 25,
    ...Platform.select({
      ios: {
        shadowColor: borderColor,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        borderTopWidth: 1,
        borderTopColor: borderColorOpacity,
      },
    }),
  },
});

export default style;