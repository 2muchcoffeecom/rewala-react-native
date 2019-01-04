import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import {
  View, Text, FlatList, ScrollView, Keyboard,
  ListRenderItem, EmitterSubscription,
} from 'react-native';
import FriendListItem, { OwnProps as IFriendListItem } from '../../../../../../shared/components/FriendListItem/index';
import AddRewalButton from '../../../../../../shared/components/AddRewalButton';
import SearchInput from '../../../../../../shared/components/SearchInput';

import { Dispatch } from 'redux';
import { RootState } from '../../../../../../redux/store';
import { ProfileModel } from '../../../../../../shared/models/profile.model';
import { SearchUserInput } from '../../../../../../shared/services/user.service';
import { PagedUsersOptions } from '../../../../../../redux/users/states';
import { PagedUserModel } from '../../../../../../shared/models/pagedUser.model';

import selectorsService from '../../../../../../shared/services/selectors.service';
import { Actions as usersActions } from '../../../../../../redux/users/AC';
import { Actions as friendsActions } from '../../../../../../redux/friends/AC';

interface StateProps {
  pagedUsersProfiles: ProfileModel[];
  pagedUsersOptions: PagedUsersOptions;
  searchResponse: PagedUserModel;
  isSearchLoading: boolean;
}

interface DispatchProps {
  search(input: SearchUserInput): void;
  getMyFollowRequests(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  pagedUsersProfiles: selectorsService.getPagedUsersProfiles(state),
  pagedUsersOptions: state.users.pagedUsersOptions,
  searchResponse: state.request.users.search.data as PagedUserModel,
  isSearchLoading: state.request.users.search.loading,
});

const mapDispatchToProps = (dispatch: Dispatch<usersActions | friendsActions>): DispatchProps => (
  {
    search: (input) => {
      dispatch(usersActions.searchUsers(input));
    },
    getMyFollowRequests: () => {
      dispatch(friendsActions.getMyFriends());
    },
  }
);

type Props = StateProps & DispatchProps;

interface State {
  searchQuery: string;
  isKeyboardVisible: boolean;
}

class SearchUserScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
      isKeyboardVisible: false,
    };
  }

  keyboardWillShowSub: EmitterSubscription;
  keyboardWillHideSub: EmitterSubscription;

  keyboardWillShow = () => {
    this.setState({
      isKeyboardVisible: true,
    });
  }

  keyboardWillHide = () => {
    this.setState({
      isKeyboardVisible: false,
    });
  }

  componentDidMount() {
    this.props.getMyFollowRequests();
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  search = (value: string) => {
    this.props.search({
      fullName: value,
      limit: 10,
    });
  }

  onChangeSearchValue = (value: string) => {
    this.setState({
      searchQuery: value,
    });
  }

  onEndReached = () => {
    const {pagedUsersOptions} = this.props;

    if (pagedUsersOptions.hasNext && pagedUsersOptions.next) {
      this.props.search({
        fullName: this.state.searchQuery,
        limit: 10,
        next: pagedUsersOptions.next,
      });
    }
  }

  listEmptyComponent = (isVisible: boolean) => {
    return (
      isVisible ?
        <Text style={style.emptyText}>Unfortunately, we could not find matches for your search request.</Text> :
        null
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
    const isVisibleEmptyComponent: boolean = this.props.searchResponse &&
      !this.props.searchResponse.results.length &&
      this.state.searchQuery !== '';

    return (
      <ScrollView contentContainerStyle={style.root}>
        <View style={style.seacrhWraper}>
          <SearchInput
            searchQuery={this.state.searchQuery}
            changeSearchQuery={this.onChangeSearchValue}
            searchRequest={this.search}
          />
        </View>
        <View style={style.wraper}>
          <View>
            <FlatList
              style={style.friendList}
              data={
                this.state.searchQuery === '' ?
                  [] :
                  this.props.pagedUsersProfiles
              }
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              onEndReached={this.onEndReached}
              initialNumToRender={10}
              maxToRenderPerBatch={2}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={this.listEmptyComponent(isVisibleEmptyComponent)}
            />
          </View>
        </View>
        {
          !this.state.isKeyboardVisible &&
          <AddRewalButton/>
        }
      </ScrollView>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SearchUserScreen);
