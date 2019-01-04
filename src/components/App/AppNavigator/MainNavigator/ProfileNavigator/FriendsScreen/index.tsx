import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, FlatList, ListRenderItem } from 'react-native';
import FriendListItem, {
  FriendNavigationProps, OwnProps as IFriendListItem,
} from '../../../../../../shared/components/FriendListItem';
import SearchInput from '../../../../../../shared/components/SearchInput';

import { NavigationInjectedProps } from 'react-navigation';
import { RootState } from '../../../../../../redux/store';
import { ProfileModel } from '../../../../../../shared/models/profile.model';
import { Dispatch } from 'redux';

import selectorsService from '../../../../../../shared/services/selectors.service';
import { Actions as friendsActions } from '../../../../../../redux/friends/AC';
import { Actions as usersActions } from '../../../../../../redux/users/AC';

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
}

class FriendsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
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
            <SearchInput
              searchQuery={this.state.searchQuery}
              changeSearchQuery={this.onChangeSearchValue}
            />
          </View>
          <View>
            <FlatList
              style={style.friendList}
              data={this.getFilteredProfiles(this.state.searchQuery)}
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
