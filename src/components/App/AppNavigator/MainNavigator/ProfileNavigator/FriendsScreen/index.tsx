import React from 'react';
import { connect } from 'react-redux';

import style from './style';

import { View, ScrollView, TextInput, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import FriendListItem, { OwnProps as IFriendListItem } from '../../../../../../shared/components/FriendListItem';

import { RootState } from '../../../../../../redux/store';
import { ProfileModel } from '../../../../../../shared/models/profile.model';

import selectorsService from '../../../../../../shared/services/selectors.service';

interface StateProps {
  friendsProfiles: ProfileModel[];
}

const mapStateToProps = (state: RootState): StateProps => ({
  friendsProfiles: selectorsService.getProfilesFromContacts(state),
});

type Props = StateProps;

interface State {
  searchQuery: string;
  filteredFriendProfiles: ProfileModel[];
}

class FriendsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
      filteredFriendProfiles: this.props.friendsProfiles,
    };
  }

  onChangeSearchValue = (value: string) => {
    this.setState({
      searchQuery: value.toLowerCase(),
      filteredFriendProfiles: this.getFilteredProfiles(value.toLowerCase()),
    })
  }

  onPressSearchDeleteButton = () => {
    this.setState({
      searchQuery: '',
    });
  }

  getFilteredProfiles = (query: string) => {
    return this.props.friendsProfiles.filter(
      (profile) => profile.fullName.toLowerCase().includes(query),
    );
  }

  private keyExtractor = (item: IFriendListItem) => `${item.userId}`;

  private renderItem: ListRenderItem<IFriendListItem> = ({item}) => {

    return (
      <FriendListItem
        userId={item.userId}
        fullName={item.fullName}
        avatarPath={item.avatarPath}
        withFriendProfile={true}
      />
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.root}>
        <View style={style.wraper}>
          <View style={style.seacrhWraper}>
            {
              this.state.searchQuery === '' ?
                <Image
                  source={require('../../../../../../../assets/search.png')}
                  style={style.searchImage}
                /> :
                <TouchableOpacity
                  onPress={this.onPressSearchDeleteButton}
                  style={style.searchDeleteButton}
                >
                  <Image
                    source={require('../../../../../../assets/delete-cross.png')}
                    style={style.searchCrossImage}
                  />
                </TouchableOpacity>
            }
            <TextInput
              style={style.searchInput}
              placeholderTextColor='#BCBCBF'
              placeholder='Search'
              onChangeText={this.onChangeSearchValue}
              value={this.state.searchQuery}
            />
          </View>
          <View>
            <FlatList
              style={style.friendList}
              data={
                this.state.searchQuery === '' ?
                  this.props.friendsProfiles :
                  this.state.filteredFriendProfiles
              }
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect<StateProps>(mapStateToProps)(FriendsScreen);
