import { StyleSheet, Platform } from 'react-native';
import { fontFamily, greyColor, whiteColor, shadowColor, errorColor } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 64,
  },
  // label: {
  //   height: 34,
  //   justifyContent: 'flex-start',
  // },
  aaa: {
    width: 300,
    height: 40,
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
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: errorColor,
  },
  inputText: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    color: greyColor,
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