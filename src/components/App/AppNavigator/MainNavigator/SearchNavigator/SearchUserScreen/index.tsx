import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, TextInput, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import FriendListItem, { OwnProps as IFriendListItem } from '../../../../../../shared/components/FriendListItem/index';
import AddRewalButton from '../../../../../../shared/components/AddRewalButton';

import { Dispatch } from 'redux';
import { RootState } from '../../../../../../redux/store';
import { ProfileModel } from '../../../../../../shared/models/profile.model';
import { SearchUserInput } from '../../../../../../shared/services/user.service';
import { PagedUsersOptions } from '../../../../../../redux/users/states';

import selectorsService from '../../../../../../shared/services/selectors.service';
import { Actions as usersActions } from '../../../../../../redux/users/AC';

interface StateProps {
  pagedUsersProfiles: ProfileModel[];
  pagedUsersOptions: PagedUsersOptions;
}

interface DispatchProps {
  search(input: SearchUserInput): void;
  deleteSearchResults(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  pagedUsersProfiles: selectorsService.getPagedUsersProfiles(state),
  pagedUsersOptions: state.users.pagedUsersOptions,
});

const mapDispatchToProps = (dispatch: Dispatch<usersActions>): DispatchProps => (
  {
    search: (input) => {
      dispatch(usersActions.searchUsers(input));
    },
    deleteSearchResults: () => {
      dispatch(usersActions.deletePagedUsersIds());
    },
  }
);

type Props = StateProps & DispatchProps;

interface State {
  searchQuery: string;
}

class SearchUserScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  onChangeSearchValue = (value: string) => {
    this.props.search({
      fullName: value,
      limit: 10,
    });
    this.props.deleteSearchResults();
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

  onPressSearchDeleteButton = () => {
    this.setState({
      searchQuery: '',
    });
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
                  source={require('../../../../../../../assets/delete-cross.png')}
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
            />
          </View>
        </View>
        <AddRewalButton/>
      </ScrollView>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SearchUserScreen);
