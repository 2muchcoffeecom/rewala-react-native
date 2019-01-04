import React from 'react';
import style from './style';

import { View } from 'react-native';
import UserListItemInfo from '../UserListItemInfo';
import CheckBoxInput from '../CheckBoxInput';

export interface OwnProps {
  userId: string;
  fullName: string;
  avatarThumbPath?: string;
  checked: boolean;
  onPressCheckbox(): void;
}

type Props = OwnProps;

const InviteFriendListItem: React.FunctionComponent<Props> = (props) => {

  const {
    avatarThumbPath, fullName, userId, checked, onPressCheckbox,
  } = props;

  return (
    <View style={style.friendListItem}>
      <UserListItemInfo
        userId={userId}
        fullName={fullName}
        avatarThumbPath={avatarThumbPath}
        withFriendProfile={false}
      />
      <View>
        <CheckBoxInput
          onPress={onPressCheckbox}
          checked={checked}
        />
      </View>
    </View>
  );
};

export default React.memo(InviteFriendListItem);
