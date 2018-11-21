import React from 'react';
// import { Provider } from 'react-redux';
// import store from '../../redux/store';
import { Text, View } from 'react-native';

export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>{`Welcome to Native! `}</Text>
      </View>
    );
  }
}
