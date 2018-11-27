import { StyleSheet, Platform } from 'react-native';
import {
  fontFamily, whiteColor, shadowColor, errorColor, errorBorderColor, blackTextColor
} from '../../../app.style';

const style = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 64,
  },
  inputContainer: {
    justifyContent: 'center',
    height: 40,
    paddingLeft: 10,
    backgroundColor: whiteColor,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputContainerError: {
    borderWidth: 0.7,
    borderStyle: 'solid',
    borderColor: errorBorderColor,
  },
  inputText: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    color: blackTextColor,
  },
  errorContainer: {
    position: 'absolute',
    top: 33,
  },
  errorText: {
    fontFamily,
    fontSize: 10,
    fontWeight: '400',
    color: errorColor,
  },
});

export default style;