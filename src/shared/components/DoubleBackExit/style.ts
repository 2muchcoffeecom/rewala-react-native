import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    width: '100%',
    backgroundColor: '#5d0756',
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
    color: '#fff',
    marginRight: 10,
  },
  buttonExit: {
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
  },
  exitText: {
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});

export default style;