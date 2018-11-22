import React from 'react';
import { BackHandler, Dimensions, Animated, TouchableOpacity, Text, View } from 'react-native';
import style from './style';

const {height} = Dimensions.get('window');

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps;

interface State {
  backClickCount: number;
}

export default class DoubleBackExit extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      backClickCount: 0,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  private springValue = new Animated.Value(100);

  private spring() {
    this.setState({backClickCount: 1}, () => {
      Animated.sequence([
        Animated.spring(
          this.springValue,
          {
            toValue: -.15 * height,
            friction: 5,
            useNativeDriver: true,
          },
        ),
        Animated.timing(
          this.springValue,
          {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          },
        ),

      ]).start(() => {
        this.setState({backClickCount: 0});
      });
    });

  }

  handleBackButton = () => {
    this.state.backClickCount === 1 ? BackHandler.exitApp() : this.spring();

    return true;
  }

  render() {

    return (
      <View style={style.container}>
        {this.props.children}

        <Animated.View style={[style.animatedView, {transform: [{translateY: this.springValue}]}]}>
          <Text style={style.exitTitleText}>Press back again to exit the app</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => BackHandler.exitApp()}
            style={style.buttonExit}
          >
            <Text style={style.exitText}>Exit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}