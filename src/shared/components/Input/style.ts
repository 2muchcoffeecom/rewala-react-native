import { StyleSheet, Platform } from 'react-native';
import { fontFamily, greyColor, whiteColor, shadowColor } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 14,
  },
  label: {
    height: 34,
    justifyContent: 'flex-start',
  },
  inputContainer: {
    // width: '100%',
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
  textInputText: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    color: greyColor,
  },
});

export default style;