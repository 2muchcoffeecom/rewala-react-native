import { Platform, StyleSheet } from 'react-native';
import { fontFamilyRegular, QuestionOptionsColor, shadowColor } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    width: 23,
    height: 17,
  },
  popupButton: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  optionsContainer: {
    width: 116,
    borderRadius: 4,
    backgroundColor: 'white',
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
  optionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 38,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    color: QuestionOptionsColor.Option2,
  },
});

export default style;