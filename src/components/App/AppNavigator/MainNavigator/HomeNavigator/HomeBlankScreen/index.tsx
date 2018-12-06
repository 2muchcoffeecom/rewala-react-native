import React from 'react';
import style from './style';

import { View, Image, Text } from 'react-native';
import AddRewalButton from '../../../../../../shared/components/AddRewalButton'

class HomeBlankScreen extends React.Component {

  render() {
    return (
      <View style={style.root}>
        <View style={style.imageWraper}>
          <Image
            source={require('../../../../../../../assets/home-blank.png')}
            resizeMode='contain'
            style={style.image}
          />
        </View>
        <View style={style.wraper}>
          <View style={style.textWraper}>
            <Text style={style.text}>
              There’re no Rewals.
            </Text>
          </View>
        </View>
        <AddRewalButton/>
      </View>
    );
  }
}

export default HomeBlankScreen;
