import { Dimensions, Platform, StyleSheet } from 'react-native';
import {
  fontFamilyRegular, fontFamilyBold, fullHeight, mainColor, greyColorAddRewal,
} from '../../../../../app.style';

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    height: fullHeight - 89,
    marginBottom: 40,
    marginTop: 49,
  },
  scrollContainer: {
    paddingBottom: 10,
    minHeight: fullHeight - 89,
  },
  bgImageContainer: {
    width: '100%',
    minHeight: Dimensions.get('window').width * 0.5333,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    minHeight: Dimensions.get('window').width * 0.5333,
    position: 'absolute',
    zIndex: -1,
  },
  questionTitleColorButtonsGroupWraper: {
    top: 15,
    right: 20,
    position: 'absolute',
  },
  multilineInputWraper: {
    width: '100%',
    paddingLeft: 48,
    paddingRight: 48,
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
    height: 45,
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
    fontSize: 10,
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
    fontSize: 10,
    color: greyColorAddRewal,
  },
  textBoldTimePickerButton: {
    fontFamily: fontFamilyBold,
    fontWeight: '700',
    fontSize: 10,
    color: mainColor,
    textAlign: 'right',
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
  invitedUserAvatars: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
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