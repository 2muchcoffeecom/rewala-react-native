import { StyleSheet } from 'react-native';
import { mainColor } from '../../../app.style';

const style = StyleSheet.create({
  optionItem: {
    width: '100%',
    height: 40,
    marginBottom: 8,
  },
  addOptionButtonWraper: {
    alignItems: 'flex-end',
    paddingRight: 23,
    paddingTop: 12,
  },
  addOptionButton: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 4,
  },
});

export default style;