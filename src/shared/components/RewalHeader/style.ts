import { StyleSheet } from 'react-native';
import { blackModalColor, fontFamilyRegular, greyColor, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: whiteColor,
    width: '100%',
    height: 70,
    paddingLeft: 24,
    paddingRight: 15,
    paddingTop: 11,
    paddingBottom: 11,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWraper: {
    height: 48,
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 7,
  },
  hoursTextWpaper: {
    flexDirection: 'row',
  },
  iconTime: {
    marginRight: 4,
  },
  fullNameText: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 14,
    color: blackModalColor,
  },
  hoursText: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 9,
    color: greyColor,
  },
  popupButton: {
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default style;