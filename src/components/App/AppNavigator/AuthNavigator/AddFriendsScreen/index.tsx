import React from 'react';
import style from './style';

import { View, ScrollView, TextInput, Image, FlatList, ListRenderItem } from 'react-native';
import RegularButton from '../../../../../shared/components/RegularButton';
import FriendListItem, {OwnProps as IFriendListItem} from '../../../../../shared/components/FriendListItem';

import navService from '../../../../../shared/services/nav.service';

class AddFriendsScreen extends React.Component {

  toHomeBlankScreen = (): void => {
    navService.navigate('HomeBlankScreen');
  }

  private keyExtractor = (item: IFriendListItem) => `${item.userId}`;

  private renderItem: ListRenderItem<IFriendListItem> = ({item}) => {

    return (
      <FriendListItem
        userId={item.userId}
        fullName={item.fullName}
        avatarDir={item.avatarDir}
        avatarFileName={item.avatarFileName}
      />
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.root}>
        <View style={style.wraper}>
          <View style={style.seacrhWraper}>
            <Image
              source={require('../../../../../../assets/search.png')}
              style={style.searchImage}
            />
            <TextInput
              style={style.searchInput}
              placeholderTextColor='#BCBCBF'
              placeholder='Search'
            />
          </View>
          <View style={style.listWraper}>
            <FlatList
              style={style.friendList}
              data={}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
          <View style={style.buttonWraper}>
            <RegularButton
              title='START USING APP'
              onPress={this.toHomeBlankScreen}
              fontSize={12}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default AddFriendsScreen;
