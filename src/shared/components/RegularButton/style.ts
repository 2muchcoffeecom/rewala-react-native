import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#5d0756',
    borderStyle: 'solid',
  },
  disabled: {
    opacity: 0.2,
  },
});

export default style;