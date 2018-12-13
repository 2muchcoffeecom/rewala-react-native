import React from 'react';
import style from './style';

import { View} from 'react-native';
import NoRewals from '../NoRewals';

class FriendUserRewals extends React.Component {

  render() {
    return (
      <View style={style.root}>
        <NoRewals/>
      </View>
    );
  }
}

export default FriendUserRewals;
