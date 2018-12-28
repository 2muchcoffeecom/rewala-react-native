import React from 'react';
import { connect } from 'react-redux';
import { greyColorIcon } from '../../../../../app.style';

import style from './style';

import { View, ScrollView, TextInput, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import RegularButton from '../../../../../shared/components/RegularButton';
import FriendListItem, { OwnProps as IFriendListItem } from '../../../../../shared/components/FriendListItem';
import { Icon } from '../../../../../shared/components/Icon';

import { RootState } from '../../../../../redux/store';
import { ProfileModel } from '../../../../../shared/models/profile.model';

import navService from '../../../../../shared/services/nav.service';
import selectorsService from '../../../../../shared/services/selectors.service';

interface StateProps {
  profilesFromContacts: ProfileModel[];
}

const mapStateToProps = (state: RootState): StateProps => ({
  profilesFromContacts: selectorsService.getProfilesFromContacts(state),
});

type Props = StateProps;

interface State {
  searchQuery: string;
  filteredProfiles: ProfileModel[];
}

class AddFriendsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
      filteredProfiles: this.props.profilesFromContacts,
    };
  }

  onChangeSearchValue = (value: string) => {
    this.setState({
      searchQuery: value.toLowerCase(),
      filteredProfiles: this.getFilteredProfiles(value.toLowerCase()),
    });
  }

  onPressSearchDeleteButton = () => {
    this.setState({
      searchQuery: '',
    });
  }

  getFilteredProfiles = (query: string) => {
    return this.props.profilesFromContacts.filter(
      (profile) => profile.fullName.toLowerCase().includes(query),
    );
  }

  toHomeBlankScreen = (): void => {
    navService.navigate('HomeBlankScreen');
  }

  private keyExtractor = (item: IFriendListItem) => `${item.userId}`;

  private renderItem: ListRenderItem<IFriendListItem> = ({item}) => {

    return (
      <FriendListItem
        userId={item.userId}
        fullName={item.fullName}
        avatarThumbPath={item.avatarThumbPath}
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
                <Icon
                  name='search'
                  size={18}
                  color={greyColorIcon}
                  style={style.searchImage}
                /> :
                <TouchableOpacity
                  onPress={this.onPressSearchDeleteButton}
                  style={style.searchDeleteButton}
                >
                  <Icon
                    name='delete-option'
                    size={10}
                    color={greyColorIcon}
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
                  this.props.profilesFromContacts :
                  this.state.filteredProfiles
              }
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

export default connect<StateProps>(mapStateToProps)(AddFriendsScreen);
