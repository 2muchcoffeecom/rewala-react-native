import React from 'react';
import style from './style';
import { whiteColor } from '../../../app.style';

import { Text, TouchableOpacity } from 'react-native';
import { Icon } from '../Icon';

interface OwnProps {
  isAddedPhoto: boolean;
  onPressAddPhotoButton(): void;
  onPressDeletePhotoButton(): void;
}

type Props = OwnProps;

const AddDeletePhotoButton: React.FunctionComponent<Props> = (props) => {
  const {isAddedPhoto, onPressAddPhotoButton, onPressDeletePhotoButton} = props;

  if (isAddedPhoto) {
    return (
      <TouchableOpacity
        style={[style.addPhotoButton, style.deletePhotoButton]}
        onPress={onPressDeletePhotoButton}
      >
        <Text style={[style.text, style.textDelete]}>DELETE PHOTO</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={style.addPhotoButton}
        onPress={onPressAddPhotoButton}
      >
        <Text style={style.text}>ADD PHOTO</Text>
        <Icon
          name='photo'
          size={13}
          color={whiteColor}
        />
      </TouchableOpacity>
    );
  }
};

export default React.memo(AddDeletePhotoButton);
