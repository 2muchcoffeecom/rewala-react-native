declare module "react-native-easy-toast" {
  import { Component, ReactNode } from "react";
  import { StyleProp, ViewStyle } from 'react-native';
  
  
  interface ToastProps {
    position?: string,
    positionValue?: number,
    fadeInDuration?: number,
    fadeOutDuration?: number,
    opacity?: number,
    textStyle?: StyleProp<ViewStyle>,
  }
  
  export const DURATION: {
    LENGTH_SHORT: number;
    FOREVER: number;
  }
  
  export default class Toast extends Component<ToastProps> {
    show: (
      text: string | ReactNode,
      duration?: number,
      callback?: (() => void)
    ) => void;
    close: (duration?: number) => void;
  }
}