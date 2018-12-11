import React from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import style from './style';

interface OwnProps {
  isVisible: boolean;
  toggleVisibility(): void;
}

type Props = OwnProps;

const ChangePasswordModal: React.FunctionComponent<Props> = (props) => {
  const {isVisible, toggleVisibility} = props;

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleVisibility}>
      <View style={style.root}>
        <View style={style.modalContainer}>
          <TouchableOpacity
            onPress={toggleVisibility}
          >
          </TouchableOpacity>
          <Text style={style.text}>Change Password</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;