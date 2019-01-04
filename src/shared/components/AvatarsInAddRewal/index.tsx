import React from 'react';
import style from './style';
import { apiEndpoint } from '../../constants/apiEndpoint';

import { View, Image } from 'react-native';

import profileService, { GetAvatarThumbsForAddRewalInput } from '../../services/profile.service';

type OwnProps = GetAvatarThumbsForAddRewalInput;

type Props = OwnProps;

const AvatarsInAddRewal: React.FunctionComponent<Props> = (props) => {
  const avatarThumbUris = profileService.getAvatarThumbsForAddRewal({
    profilesData: props.profilesData,
    invitedFriends: props.invitedFriends,
  });

  return (
    <View style={style.root}>
      {
        avatarThumbUris.map((avatarUri, index) => (
          <Image
            source={{uri: `${apiEndpoint}${avatarUri}`}}
            key={index}
            style={[style.image, {left: -7 * index}]}
          />
        ))
      }

    </View>
  );
};

export default React.memo(AvatarsInAddRewal);
