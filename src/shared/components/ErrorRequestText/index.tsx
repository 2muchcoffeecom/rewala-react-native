import React from 'react';
import style from './style';
import { Text } from 'react-native';

const ErrorRequestText: React.FunctionComponent = ({children}) => {
  return (
    <Text style={style.textError}>
      {children}
    </Text>
  );
};

export default ErrorRequestText;
