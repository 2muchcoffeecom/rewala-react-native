import { StyleSheet } from 'react-native';
import { mainColor, whiteColor } from '../../../app.style';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    width: '100%',
    backgroundColor: mainColor,
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  exitTitleText: {
    textAlign: 'center',
    color: whiteColor,
    marginRight: 10,
  },
  buttonExit: {
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: whiteColor,
  },
  exitText: {
    color: whiteColor,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});

export default style;