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
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});

export default style;