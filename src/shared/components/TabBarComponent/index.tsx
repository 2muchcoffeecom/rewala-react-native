import React from 'react';
import { Keyboard, EmitterSubscription } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import { TabBarBottomProps } from 'react-navigation';

interface State {
  isVisible: boolean;
}

type Props = TabBarBottomProps;

class TabBarComponent extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      isVisible: true,
    };
  }

  keyboardWillShowSub: EmitterSubscription;
  keyboardWillHideSub: EmitterSubscription;

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = () => {
    this.setState({
      isVisible: false,
    });
  }

  keyboardWillHide = () => {
    this.setState({
      isVisible: true,
    });
  }

  render() {
    return this.state.isVisible ?
      <BottomTabBar {...this.props} />
      :
      null;
  }
}

export default TabBarComponent;