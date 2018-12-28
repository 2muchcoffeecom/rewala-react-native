import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, TextInput, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import { Icon } from '../../../../../../shared/components/Icon';
import FriendListItem, {
  FriendNavigationProps, OwnProps as IFriendListItem,
} from '../../../../../../shared/components/FriendListItem';

import { NavigationInjectedProps } from 'react-navigation';
import { RootState } from '../../../../../../redux/store';
import { ProfileModel } from '../../../../../../shared/models/profile.model';
import { Dispatch } from 'redux';

import selectorsService from '../../../../../../shared/services/selectors.service';
import { Actions as friendsActions } from '../../../../../../redux/friends/AC';
import { Actions as usersActions } from '../../../../../../redux/users/AC';
import { greyColorIcon } from '../../../../../../app.style';

interface StateProps {
  myFriendsProfiles: ProfileModel[];
  userFriendsProfiles: ProfileModel[];
}

interface DispatchProps {
  getMyFollowRequests(): void;
  getUserFriends(userId?: string): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  myFriendsProfiles: selectorsService.getMyFriendsProfiles(state),
  userFriendsProfiles: selectorsService.getUserFriendsProfiles(state),
});

const mapDispatchToProps = (dispatch: Dispatch<friendsActions | usersActions>): DispatchProps => (
  {
    getMyFollowRequests: () => {
      dispatch(friendsActions.getMyFriends());
    },
    getUserFriends: (userId) => {
      dispatch(usersActions.getFrinedsOfUser(userId));
    },
  }
);

type Props = StateProps & DispatchProps & NavigationInjectedProps<FriendNavigationProps>;

interface State {
  searchQuery: string;
  filteredFriendProfiles: ProfileModel[];
}

class FriendsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
      filteredFriendProfiles: this.props.navigation.getParam('userId') ?
        this.props.userFriendsProfiles :
        this.props.myFriendsProfiles,
    };
  }

  componentDidMount() {
    const userId = this.props.navigation.getParam('userId');

    this.props.getMyFollowRequests();
    this.props.getUserFriends(userId);
  }

  onChangeSearchValue = (value: string) => {
    this.setState({
      searchQuery: value.toLowerCase(),
      filteredFriendProfiles: this.getFilteredProfiles(value.toLowerCase()),
    });
  }

  onPressSearchDeleteButton = () => {
    this.setState({
      searchQuery: '',
    });
  }

  getFilteredProfiles = (query: string) => {
    return this.props.navigation.getParam('userId') ?
      this.props.userFriendsProfiles.filter(
        (profile) => profile.fullName.toLowerCase().includes(query),
      ) :
      this.props.myFriendsProfiles.filter(
        (profile) => profile.fullName.toLowerCase().includes(query),
      );
  }

  private keyExtractor = (item: IFriendListItem) => `${item.userId}`;

  private renderItem: ListRenderItem<IFriendListItem> = ({item}) => {

    return (
      <FriendListItem
        userId={item.userId}
        fullName={item.fullName}
        avatarThumbPath={item.avatarThumbPath}
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
                  this.props.navigation.getParam('userId') ?
                    this.props.userFriendsProfiles :
                    this.props.myFriendsProfiles :
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

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FriendsScreen);
