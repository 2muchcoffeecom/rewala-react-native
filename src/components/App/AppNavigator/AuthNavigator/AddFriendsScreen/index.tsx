import React from 'react';
import { connect } from 'react-redux';

import style from './style';

import { View, ScrollView, TextInput, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import RegularButton from '../../../../../shared/components/RegularButton';
import FriendListItem, { OwnProps as IFriendListItem } from '../../../../../shared/components/FriendListItem';

import { RootState } from '../../../../../redux/store';
import { ProfileModel } from '../../../../../shared/models/profile.model';

import navService from '../../../../../shared/services/nav.service';
import contactsService from '../../../../../shared/services/contacts.service';

interface StateProps {
  profilesFromContacts: ProfileModel[];
  state: RootState;
}

const mapStateToProps = (state: RootState): StateProps => ({
  profilesFromContacts: contactsService.getProfilesFromContacts(state),
  state
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

  // componentDidUpdate(prevProps: Props, prevState: State) {
  //   if (
  //     prevState.searchQuery !== this.state.searchQuery ||
  //     prevProps.profilesFromContacts !== this.props.profilesFromContacts
  //   ) {
  //     this.getFilteredProfiles();
  //   }
  // }

  onChangeSearchValue = (value: string) => {
    this.setState({
      searchQuery: value.toLowerCase(),
      filteredProfiles: this.getFilteredProfiles(value.toLowerCase()),
    })
  }

  onPressSearchDeleteButton = () => {
    this.setState({
      searchQuery: '',
    });
  }

  // filteredProfiles: ProfileModel[];

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
        avatarPath={item.avatarPath}
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
                  source={require('../../../../../../assets/search.png')}
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
