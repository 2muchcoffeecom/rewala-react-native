import React from 'react';
import withKeyboard, { KeyboardInjectedProps } from '../../HOC/withKeyboard';
import { BottomTabBar } from 'react-navigation-tabs';

import { TabBarBottomProps } from 'react-navigation';

type Props = TabBarBottomProps & KeyboardInjectedProps;

const TabBarComponent: React.FunctionComponent<Props> = (props: Props) => {
  return (
    !props.isKeyboardVisible ?
      <BottomTabBar {...props} />
      :
      null
  );
};

export default withKeyboard(TabBarComponent);