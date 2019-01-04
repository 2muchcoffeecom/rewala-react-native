import { StyleSheet } from 'react-native';
import { fontFamilyRegular, blackTextColor } from '../../../app.style';

const style = StyleSheet.create({
  friendInfoWraper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  friendAvatar: {
    borderRadius: 24,
    height: 48,
    width: 48,
    marginRight: 8,
  },
  friendName: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 13,
    color: blackTextColor,
  },
});

export default style;