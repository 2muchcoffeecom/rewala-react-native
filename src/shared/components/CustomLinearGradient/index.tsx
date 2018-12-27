import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface OwnProps {
  angle: number;
}

type Props = OwnProps;

const CustomLinearGradient: React.FunctionComponent<Props> = (props) => {
  return (
    <LinearGradient
      colors={['#7FB2FD', '#5D70FF']}
      useAngle={true}
      angle={props.angle}
      style={{flex: 1}}
    >
      {props.children}
    </LinearGradient>
  );
};

export default CustomLinearGradient;

