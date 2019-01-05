import React from 'react';

import { Keyboard, EmitterSubscription } from 'react-native';

type Props = any;

export interface KeyboardInjectedProps {
  isKeyboardVisible: boolean;
}

type State = KeyboardInjectedProps;

export default function withKeyboard(
  WrappedComponent: React.ComponentClass<Props> | React.FunctionComponent<Props>,
) {
  return class extends React.PureComponent<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        isKeyboardVisible: false,
      };
    }

    keyboardWillShowSub: EmitterSubscription;
    keyboardWillHideSub: EmitterSubscription;

    keyboardWillShow = () => {
      this.setState({
        isKeyboardVisible: true,
      });
    }

    keyboardWillHide = () => {
      this.setState({
        isKeyboardVisible: false,
      });
    }

    componentDidMount() {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    }

    render() {
      return (
        <WrappedComponent
          isKeyboardVisible={this.state.isKeyboardVisible}
          {...this.props}
        />
      );
    }
  };
}