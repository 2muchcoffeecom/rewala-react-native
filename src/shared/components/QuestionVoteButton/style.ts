import { Platform, StyleSheet } from 'react-native';
import { blackModalColor, fontFamilyRegular, mainColor, shadowColor, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    marginBottom: 8,
    backgroundColor: whiteColor,
    borderLeftColor: mainColor,
    borderLeftWidth: 4,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonTitle: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 13,
    color: blackModalColor,
  },
});

export default style;