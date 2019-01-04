import React from 'react';
import { blackTextColor } from '../../../app.style';
import style from './style';

import { FlatList, ListRenderItem, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RegularButton from '../RegularButton';
import SearchInput from '../SearchInput';
import InviteFriendListItem from '../InviteFriendListItem';
import { Icon } from '../Icon';

import { OwnProps as IFriendListItem } from '../FriendListItem';
import { ProfileModel } from '../../models/profile.model';

interface OwnProps {
  myFriendsProfiles: ProfileModel[];
  isVisible: boolean;
  toggleVisibility(): void;
  confirmSelection(data: string[]): void;
}

type Props = OwnProps;

interface State {
  searchQuery: string;
  addedFriendUserIds: Set<string>;
}

class InviteFriendsModal extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: '',
      addedFriendUserIds: new Set<string>(),
    };
  }

  onCloseModal = () => {
    this.props.toggleVisibility();
  }

  changeSearchQuery = (value: string) => {
    this.setState({
      searchQuery: value,
    });
  }

  getFilteredProfiles = (query: string) => {
    return this.props.myFriendsProfiles.filter(
      (profile) => profile.fullName.toLowerCase().includes(query.toLowerCase()),
    );
  }

  onPressConfirmButton = () => {
    this.props.confirmSelection([...this.state.addedFriendUserIds]);
    this.props.toggleVisibility();
  }

  onPressSelectAll = () => {
    const userIds = this.props.myFriendsProfiles.map<string>((user) => user.userId);
    if (userIds.length !== this.state.addedFriendUserIds.size) {
      this.setState({
        addedFriendUserIds: new Set<string>(userIds),
      });
    } else {
      this.setState({
        addedFriendUserIds: new Set(),
      });
    }
  }

  private keyExtractor = (item: IFriendListItem) => `${item.userId}`;

  private renderItem: ListRenderItem<IFriendListItem> = ({item}) => {
    const onPressCheckbox = () => {
      this.state.addedFriendUserIds.has(item.userId) ?
        this.setState((state) => {
          state.addedFriendUserIds.delete(item.userId);

          return {
            addedFriendUserIds: new Set<string>(state.addedFriendUserIds),
          };
        }) :
        this.setState((state) => ({
          addedFriendUserIds: new Set<string>(state.addedFriendUserIds.add(item.userId)),
        }));
    };

    return (
      <InviteFriendListItem
        userId={item.userId}
        fullName={item.fullName}
        avatarThumbPath={item.avatarThumbPath}
        checked={this.state.addedFriendUserIds.has(item.userId)}
        onPressCheckbox={onPressCheckbox}
      />
    );
  }

  render() {
    const {isVisible} = this.props;
    const userIds = this.props.myFriendsProfiles.map<string>((user) => user.userId);

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={this.onCloseModal}>
        <ScrollView contentContainerStyle={style.root}>
          <View style={style.modalContainer}>
            <TouchableOpacity
              onPress={this.onCloseModal}
              style={style.closeButton}
            >
              <Icon
                name='close-popup'
                size={15}
                color={blackTextColor}
              />
            </TouchableOpacity>
            <View style={style.searchWraper}>
              <SearchInput
                searchQuery={this.state.searchQuery}
                changeSearchQuery={this.changeSearchQuery}
              />
            </View>
            <TouchableOpacity
              style={style.selectAllButton}
              onPress={this.onPressSelectAll}
            >
              {
                !!userIds.length &&
                <Text style={style.text}>
                  {
                    userIds.length !== this.state.addedFriendUserIds.size ?
                      'Select All' :
                      'Deselect All'
                  }
                </Text>
              }
            </TouchableOpacity>
            <FlatList
              style={style.friendList}
              data={this.getFilteredProfiles(this.state.searchQuery)}
              extraData={this.state.addedFriendUserIds}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
            <View style={style.buttonContainer}>
              <View style={style.buttonWraper}>
                <RegularButton
                  title='CONFIRM'
                  fontSize={12}
                  onPress={this.onPressConfirmButton}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

export default InviteFriendsModal;