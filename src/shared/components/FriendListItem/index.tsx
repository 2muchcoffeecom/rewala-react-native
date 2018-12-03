import React from 'react';
import { Image, Text, View } from 'react-native';
import style from './style';

import RegularButton from '../RegularButton';

const FriendListItem: React.FunctionComponent = () => {

  return (
    <View style={style.friendListItem}>
      <View style={style.friendInfoWraper}>
        <Image
          source={require('../../../../assets/avatar-placeholder.png')}
          style={style.friendAvatar}
        />
        <Text
          style={style.friendName}
        >
          Calvin Bates
        </Text>
      </View>
      <View style={style.friendButtonWraper}>
        <RegularButton
          title='ADD FRIEND'
          fontSize={9}
          onPress={() => console.log('dfdf')}
        />
      </View>
    </View>
  );
};

export default React.memo(FriendListItem);
