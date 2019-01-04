import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, FlatList, ListRenderItem, EmitterSubscription, Keyboard } from 'react-native';
import RegularButton from '../../../../../shared/components/RegularButton';
import FriendListItem, { OwnProps as IFriendListItem } from '../../../../../shared/components/FriendListItem';
import SearchInput from '../../../../../shared/components/SearchInput';

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
  isKeyboardVisible: boolean;
}

class AddFriendsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
      isKeyboardVisible: false,
    };
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
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

  onChangeSearchValue = (value: string) => {
    this.setState({
      searchQuery: value.toLowerCase(),
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
      <View style={style.root}>
        <ScrollView style={style.scrollRoot} contentContainerStyle={style.scrollContainer}>
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
        {
          !this.state.isKeyboardVisible &&
          <View style={style.buttonWraper}>
            <RegularButton
              title='START USING APP'
              onPress={this.toHomeBlankScreen}
              fontSize={12}
            />
          </View>
        }
      </View>
    );
  }
}

export default connect<StateProps>(mapStateToProps)(AddFriendsScreen);
