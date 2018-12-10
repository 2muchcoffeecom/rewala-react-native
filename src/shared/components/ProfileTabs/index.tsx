import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import style from './style';

import FriendsRewals from '../../components/FriendsRewals';
import MyRewals from '../../components/MyRewals';

interface State {
  isActiveFriendRewals: boolean;
  isActiveMyRewals: boolean;
}

class ProfileTabs extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isActiveFriendRewals: true,
      isActiveMyRewals: false,
    };
  }

  toggleTabs = () => {
    this.setState((state) => ({
      isActiveMyRewals: !state.isActiveMyRewals,
      isActiveFriendRewals: !state.isActiveFriendRewals,
    }));
  }

  render() {
    const {isActiveFriendRewals, isActiveMyRewals} = this.state;

    return (
      <View style={style.root}>
        <View style={style.tabs}>
          <TouchableOpacity
            onPress={this.toggleTabs}
            style={isActiveMyRewals ? [style.button, style.activeButton] : style.button}
          >
            <Text style={isActiveMyRewals ? style.activeLabel : style.label}>
              MY REWALS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleTabs}
            style={isActiveFriendRewals ? [style.button, style.activeButton] : style.button}
          >
            <Text style={isActiveFriendRewals ? style.activeLabel : style.label}>
              FRIENDS’ REWALS
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.content}>
          {isActiveFriendRewals && <FriendsRewals/>}
          {isActiveMyRewals && <MyRewals/>}
        </View>
      </View>
    );
  }
}

export default ProfileTabs;
