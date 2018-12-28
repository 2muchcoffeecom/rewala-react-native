import { Platform, StyleSheet } from 'react-native';
import {
  fontFamilyRegular, fontFamilyBold, fullHeight, mainColor, whiteColor, greyColorAddRewal,
} from '../../../../../app.style';

const style = StyleSheet.create({
  root: {
    height: fullHeight - 40,
    marginTop: 49,
  },
  scrollContainer: {
    paddingBottom: 50,
    minHeight: fullHeight - 89,
  },
  bgImageContainer: {
    width: '100%',
    height: 200,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  multilineInputWraper: {
    width: '100%',
    paddingLeft: 48,
    paddingRight: 48,
    height: 120,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 90,
    height: 24,
    paddingLeft: 11,
    paddingRight: 11,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
  },
  addPhotoButtonWraper: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  iconPhoto: {
    width: 14,
    height: 11,
  },
  modalBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 37,
    paddingRight: 30,
    paddingLeft: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#D1D1D1',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        borderBottomColor: '#D1D1D1',
        borderBottomWidth: 2,
      },
    }),
  },
  textInviteFriendsButton: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 9,
    color: mainColor,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginLeft: 6,
  },
  textTimePickerButton: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 7,
    color: greyColorAddRewal,
  },
  textBoldTimePickerButton: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 7,
    color: mainColor,
    textAlign: 'right',
  },
  textAddPhoto: {
    fontFamily: fontFamilyRegular,
    fontWeight: '400',
    fontSize: 8,
    color: whiteColor,
  },
  textBold: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
  },
  optionWraper: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 20,
  },
  buttonCreate: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    width: '100%',
    backgroundColor: mainColor,
  },
});

export default style;