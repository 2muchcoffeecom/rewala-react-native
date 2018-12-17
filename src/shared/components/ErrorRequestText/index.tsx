import React from 'react';
import style from './style';
import { Text } from 'react-native';

interface OwnProps {
  top?: number;
}

type Props = OwnProps;

const ErrorRequestText: React.FunctionComponent<Props> = (props) => {
  return (
    <Text style={
      props.top ?
        [style.textError, {top: props.top}] :
        style.textError
    }
    >
      {props.children}
    </Text>
  );
};

export default ErrorRequestText;
