import React from 'react';
import style from './style';

import { TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker, { Options } from 'react-native-image-crop-picker';

export interface ImagePickerInput {
  uri: string;
  type: string;
  name: string;
}

interface OwnProps {
  title: string;
  isVisible: boolean;
  toggleVisibility(): void;
  selectImage(image: ImagePickerInput): void;
  pickerOptions: Options;
}

type Props = OwnProps;

const ChangePasswordModal: React.FunctionComponent<Props> = (props) => {

  const onCloseModal = () => {
    props.toggleVisibility();
  };

  const onSelectFromLibrary = () => {
    ImagePicker.openPicker(props.pickerOptions)
      .then((image) => {
        if (!Array.isArray(image)) {
          const name = Date.now().toString();

          props.selectImage({
            uri: image.path,
            type: image.mime,
            name,
          });
        }

        onCloseModal();
      });
  };

  const onSelectFromCamera = () => {
    ImagePicker.openCamera(props.pickerOptions)
      .then((image) => {
        if (!Array.isArray(image)) {
          const name = Date.now().toString();

          props.selectImage({
            uri: image.path,
            type: image.mime,
            name,
          });
        }

        onCloseModal();
      });
  };

  const {isVisible, title} = props;

  return (
    <Modal
      onBackdropPress={onCloseModal}
      backdropColor='#181818'
      backdropOpacity={0.74}
      onBackButtonPress={onCloseModal}
      isVisible={isVisible}
    >
      <View style={style.root}>
        <View style={style.modalContainer}>
          <View style={style.titleWraper}>
            <Text style={style.textTitle}>{title}</Text>
          </View>
          <TouchableOpacity
            style={style.button}
            onPress={onSelectFromCamera}
          >
            <Text style={style.text}>Select form camera...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={onSelectFromLibrary}
          >
            <Text style={style.text}>Select form library...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;