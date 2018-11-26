declare module 'react-native-country-picker-modal' {
  import { Component } from 'react';

  export interface Country {
    callingCode: string;
    cca2: string;
    currency: string;
    flag: string;
    name: {
      common: string,
      cym: string,
      deu: string,
      fin: string,
      fra: string,
      hrv: string,
      isr: string,
      ita: string,
      jpn: string,
      nld: string,
      por: string,
      rus: string,
      spa: string,
      svk: string,
      zho: string,
    };
  }

  interface CountryPickerProps {
    cca2: string;
    translation?: string;
    onChange: (value: string) => void;
    onClose?: () => void;
    closeable?: boolean;
    filterable?: boolean;
    countryList?: string[];
    excludeCountries?: string[];
    styles?: any;
    filterPlaceholder?: string;
    autoFocusFilter?: boolean;
    disabled?: boolean;
    filterPlaceholderTextColor?: string;
    closeButtonImage?: Component;
    transparent?: boolean;
    animationType?: string;
    flagType?: string;
    hideAlphabetFilter?: boolean;
    renderFilter?: () => void;
    showCallingCode?: boolean;
    filterOptions?: any;
  }

  export const getAllCountries: () => Country[];

  export default class CountryPicker extends Component<CountryPickerProps> {
  }
}
