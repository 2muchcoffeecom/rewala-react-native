import React from 'react';
import style from './style';
import { blackModalColor, linearGradientColors } from '../../../app.style';
import { apiEndpoint } from '../../constants/apiEndpoint';

import { Dimensions, Image, TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

interface OwnProps {
  title: string;
  titleColor: string;
  isVisible: boolean;
  toggleVisibility(): void;
  backgroundPath?: string;
  backgroundRatio?: number;
}

type Props = OwnProps;

const RewalBackground: React.FunctionComponent<Props> = (props) => {
  const {isVisible, title, titleColor, backgroundPath, toggleVisibility} = props;

  const onCloseModal = () => {
    toggleVisibility();
  };

  // const backgroundHeight = Dimensions.get('window').width / props.backgroundRatio;
  const backgroundUri = `${apiEndpoint}${backgroundPath}`;

  const getGradient = (): JSX.Element => (
    <LinearGradient
      colors={linearGradientColors}
      useAngle={true}
      angle={26}
      style={style.gradient}
    >
      <Text
        style={[style.textTitle, {color: titleColor}]}
      >
        {title}
      </Text>
    </LinearGradient>
  );

  const getBackgroundImage = (): JSX.Element => (
    <React.Fragment>
      <TouchableOpacity
        onPress={toggleVisibility}
        style={style.gradient}
      >
        <Text
          style={[style.textTitle, {color: titleColor}]}
        >
          {title}
        </Text>
        <Image
          source={{uri: backgroundUri}}
          resizeMode='cover'
          style={style.backgroundImage}
        />
      </TouchableOpacity>
      <Modal
        onBackdropPress={onCloseModal}
        backdropColor={blackModalColor}
        backdropOpacity={0.74}
        onBackButtonPress={onCloseModal}
        isVisible={isVisible}
        deviceHeight={Dimensions.get('screen').height}
      >
        <View style={style.modalRoot}>
          <View style={style.modalContainer}>
            <Image
              source={{uri: backgroundUri}}
              resizeMode='contain'
              style={
                [style.backgroundFullScreen/*, {height: avatarHeight}*/]
              }
            />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );

  return (
    <View style={style.bgImageContainer}>
      {!backgroundPath ? getGradient() : getBackgroundImage()}
    </View>
  );
};

export default React.memo(RewalBackground);