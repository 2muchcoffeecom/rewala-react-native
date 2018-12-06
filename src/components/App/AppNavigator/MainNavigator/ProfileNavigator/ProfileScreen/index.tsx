import React from 'react';
import style from './style';

import { View, Image, Text } from 'react-native';
import AddRewalButton from '../../../../../../shared/components/AddRewalButton';
import RegularButton from '../../../../../../shared/components/RegularButton';

import navService from '../../../../../../shared/services/nav.service';

class ProfileScreen extends React.Component {

  onPressButtonSettings = () => {
    navService.navigate('ProfileSettingsScreen');
  }

  render() {
    return (
      <View style={style.root}>
        <View style={style.meInfo}>
          <View style={style.meNameWraper}>
            <Text style={style.meName}>Mark</Text>
          </View>
          <View style={style.wraperMe}>
            <View style={style.avatarWraper}>
              <Image
                source={require('../../../../../../../assets/avatar-placeholder.png')}
                resizeMode='contain'
                style={style.image}
              />
            </View>
            <View style={style.textWraper}>
              <Text style={style.text}>
                <Text style={style.textBold}>20 </Text>
                Friends
              </Text>
              <Text style={style.text}>
                <Text style={style.textBold}>20 </Text>
                Rewals
              </Text>
              <View style={style.buttonSettingsWraper}>
                <RegularButton
                  title='Profile Settings'
                  fontSize={13}
                  onPress={this.onPressButtonSettings}
                  isInverted={true}
                />
              </View>
            </View>
          </View>
        </View>
        <AddRewalButton/>
      </View>
    );
  }
}

export default ProfileScreen;
