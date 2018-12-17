import { Dimensions, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: Dimensions.get('window').width,
  },
  avatarWraper: {
    borderRadius: 40,
  },
  avatarMini: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarFullScreen: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});

export default style;