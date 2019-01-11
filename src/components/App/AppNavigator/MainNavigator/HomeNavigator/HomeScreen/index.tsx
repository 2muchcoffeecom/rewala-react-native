import React from 'react';
import style from './style';

import { View } from 'react-native';
import AddRewalButton from '../../../../../../shared/components/AddRewalButton';
import NoRewals from '../../../../../../shared/components/NoRewals';

class HomeScreen extends React.Component {

  render() {
    return (
      <View style={style.root}>
        <NoRewals/>
        <AddRewalButton/>
      </View>
    );
  }
}

export default HomeScreen;
