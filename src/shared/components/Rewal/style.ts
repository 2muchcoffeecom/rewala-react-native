import { StyleSheet } from 'react-native';
import { fontFamilyRegular, greyColor, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    width: '100%',
    marginBottom: 8,
    backgroundColor: whiteColor,
  },
  timeAgo: {
    alignSelf: 'flex-end',
    marginRight: 11,
    marginBottom: 18,
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 9,
    color: greyColor,
  },
});

export default style;