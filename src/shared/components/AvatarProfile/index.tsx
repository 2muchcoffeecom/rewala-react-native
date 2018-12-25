import React from 'react';
import style from './style';

import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { apiEndpoint } from '../../constants/apiEndpoint';
import { ProfileModel } from '../../models/profile.model';

interface OwnProps {
  profile: ProfileModel;
  isVisible: boolean;
  avatarRatio: number;
  toggleVisibility(): void;
}

type Props = OwnProps;

const AvatarProfile: React.FunctionComponent<Props> = (props) => {

  const onCloseModal = () => {
    props.toggleVisibility();
  };

  const avatarHeight = Dimensions.get('window').width / props.avatarRatio;
  const avatarUri = `${apiEndpoint}/${props.profile.avatarPath}`;

  const {isVisible, profile} = props;

  return (
    <View>
      <TouchableOpacity
        style={style.avatarWraper}
        onPress={props.toggleVisibility}
      >
        <Image
          source={{uri: `${apiEndpoint}/${profile.avatarThumbPath}`}}
          style={style.avatarMini}
        />
      </TouchableOpacity>
      <Modal
        onBackdropPress={onCloseModal}
        backdropColor='#181818'
        backdropOpacity={0.74}
        onBackButtonPress={onCloseModal}
        isVisible={isVisible}
      >
        <View style={style.modalRoot}>
          <View style={style.modalContainer}>
            <Image
              source={{uri: avatarUri}}
              resizeMode='contain'
              style={
                [style.avatarFullScreen, {height: avatarHeight}]
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AvatarProfile;