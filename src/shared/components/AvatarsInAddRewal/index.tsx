import React from 'react';
import style from './style';
import { apiEndpoint } from '../../constants/apiEndpoint';

import { View, Image } from 'react-native';

interface OwnProps {
  avatarThumbUris: string[];
}

type Props = OwnProps;

const AvatarsInAddRewal: React.FunctionComponent<Props> = (props) => {

  return (
    <View style={style.root}>
      {
        props.avatarThumbUris.map((avatarUri, index) => (
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
