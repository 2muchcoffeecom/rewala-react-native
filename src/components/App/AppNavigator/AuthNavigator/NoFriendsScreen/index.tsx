import React from 'react';
import style from './style';

import { View, ScrollView, Image, Text } from 'react-native';
import RegularButton from '../../../../../shared/components/RegularButton';

import navService from '../../../../../shared/services/nav.service';

class NoFriendsScreen extends React.PureComponent {

  toHomeBlankScreen = (): void => {
    navService.navigate('HomeScreen');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.root}>
        <View style={style.imageWraper}>
          <Image
            source={require('../../../../../../assets/no-friends.png')}
            resizeMode='contain'
            style={style.image}
          />
        </View>
        <View style={style.wraper}>
          <View style={style.textWraper}>
            <Text style={style.text}>
              You haven’t friends using Rewala right now.
            </Text>
          </View>
        </View>
        <View style={style.buttonWraper}>
          <RegularButton
            title='START USING APP'
            onPress={this.toHomeBlankScreen}
            fontSize={12}
          />
        </View>
      </ScrollView>
    );
  }
}

export default NoFriendsScreen;
