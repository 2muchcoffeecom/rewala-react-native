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
    alignSelf: 'center',
    width: 80,
    height: 80,
    marginTop: 16,
    marginBottom: 40,
  },
  imageWraper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  avatarImage: {
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  iconPhoto: {
    width: 20,
    height: 16,
  },
  textAccountWraper: {
    marginBottom: 15,
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
  inputWraper: {
    zIndex: 0,
  },
  iconPencil: {
    position: 'absolute',
    top: 13,
    right: 16,
    zIndex: 10,
    width: 12,
    height: 13,
  },
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