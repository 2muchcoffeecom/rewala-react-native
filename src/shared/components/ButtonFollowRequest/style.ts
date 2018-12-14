import { StyleSheet } from 'react-native';
import { blackTextColor, fontFamilyBold, fontFamilyRegular } from "../../../app.style";

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonsAddDeleteWraper: {
    width: 100,
    height: 32,
  },
  buttonsAcceptDeclineWraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 190,
  },
  buttonsAcceptDecline: {
    width: 85,
    height: 32,
  },
  buttonCancelWraper: {
    width: 115,
    height: 32,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    color: blackTextColor,
  },
  buttonFriend: {
    marginRight: 13,
  },
  textBold: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
  },
});

export default style;