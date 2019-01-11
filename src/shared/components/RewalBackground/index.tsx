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
  backgroundPath?: string;
  backgroundRatio?: number;
}

type Props = OwnProps;

interface State {
  isVisibleModal: boolean;
}

class RewalBackground extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleModal: false,
    };
  }

  toggleModalVisibility = () => {
    this.setState((state) => ({
      isVisibleModal: !state.isVisibleModal,
    }));
  }

  onCloseModal = () => {
    this.toggleModalVisibility();
  }

  getGradient = (): JSX.Element => (
    <LinearGradient
      colors={linearGradientColors}
      useAngle={true}
      angle={26}
      style={style.gradient}
    >
      <Text
        style={[style.textTitle, {color: this.props.titleColor}]}
      >
        {this.props.title}
      </Text>
    </LinearGradient>
  )

  getBackgroundImage = (): JSX.Element => {
    const backgroundUri = `${apiEndpoint}${this.props.backgroundPath}`;
    const {title, titleColor} = this.props;

    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={this.toggleModalVisibility}
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
          onBackdropPress={this.onCloseModal}
          backdropColor={blackModalColor}
          backdropOpacity={0.74}
          onBackButtonPress={this.onCloseModal}
          isVisible={this.state.isVisibleModal}
          deviceHeight={Dimensions.get('screen').height}

        >
          <View style={style.modalRoot}>
            <View style={style.modalContainer}>
              <Image
                source={{uri: backgroundUri}}
                resizeMode='contain'
                style={style.backgroundFullScreen}
              />
            </View>
          </View>
        </Modal>
      </React.Fragment>
    );
  }

  render() {
    return (
      <View style={style.bgImageContainer}>
        {!this.props.backgroundPath ? this.getGradient() : this.getBackgroundImage()}
      </View>
    );
  }
}

export default RewalBackground;

// TODO: no back end for fullScreen background
