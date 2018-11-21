declare module "react-native-shadow" {
  import { Component } from "react";
  import { StyleProp, ViewStyle } from 'react-native';
  
  
  interface ShadowProps {
    setting?: BoxShadowSetting | BorderShadowSetting,
  }
  
  interface BoxShadowSetting {
    width?: number,
    height?: number,
    color?: string,
    border?: number,
    radius?: number,
    opacity?: number,
    x?: number,
    y?: number,
    style?: StyleProp<ViewStyle>,
  }
  
  interface BorderShadowSetting {
    width?: number,
    color?: string,
    border?: number,
    opacity?: number,
    style?: StyleProp<ViewStyle>,
    side?: string,
    inset?: boolean,
  }
  
  export class BoxShadow extends Component<ShadowProps> {
  }
  
  export class BorderShadow extends Component<ShadowProps> {
  }
}