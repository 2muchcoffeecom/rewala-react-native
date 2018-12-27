import { StyleSheet, Platform } from 'react-native';
import {
  whiteColor, shadowColor, blackTextColor, fontFamilyRegular,
} from '../../../app.style';

const style = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  inputContainer: {
    justifyContent: 'center',
    height: 40,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: whiteColor,
    borderLeftWidth: 4,
    borderStyle: 'solid',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputText: {
    width: '100%',
    paddingRight: 25,
    fontFamily: fontFamilyRegular,
    fontSize: 12,
    fontWeight: '400',
    color: blackTextColor,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25.5,
    height: 40,
  },
  crossImage: {
    width: 13.5,
    height: 12,
  },
});

export default style;