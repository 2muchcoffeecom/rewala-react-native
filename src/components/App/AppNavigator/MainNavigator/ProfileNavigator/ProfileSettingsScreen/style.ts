import { StyleSheet } from 'react-native';
import {
  fontFamilyRegular, fontFamilyBold, blackTextColor, fullHeight, mainColor,
} from '../../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: fullHeight - 89,
    paddingLeft: 24,
    paddingRight: 25,
    paddingTop: 49,
  },
  avatarButton: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  textAccountWraper: {
    marginBottom: 15,
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 14,
    color: blackTextColor,
  },
  textLink: {
    color: mainColor,
    fontSize: 16,
  },
  textTitle: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 16,
    color: blackTextColor,
  },
  inputWraper: {},
  notificationWraper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 37,
  },
  notificationImageWraper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationImage: {
    width: 21.2,
    height: 21.2,
    marginRight: 12,
  },
  changePasswordButton: {
    marginBottom: 107,
  },
  confirmButtonWraper: {
    alignSelf: 'center',
    width: 159,
    height: 40,
  },
});

export default style;