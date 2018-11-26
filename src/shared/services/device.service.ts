import DeviceInfo from 'react-native-device-info';
import { getAllCountries, Country } from 'react-native-country-picker-modal';

interface UserCountryData {
  callingCode: string;
  cca2: string;
}

interface IDeviceService {
  userLocaleCountryCode: string;
  getUserCountryData(): UserCountryData;
}

class DeviceService implements IDeviceService {

  userLocaleCountryCode: string = DeviceInfo.getDeviceCountry();

  getUserCountryData() {
    const userCountryData = getAllCountries()
      .filter((country: Country) => {
        return country.cca2 === this.userLocaleCountryCode;
      })
      .pop();
    const callingCode = userCountryData ? userCountryData.callingCode : '1';
    const cca2 = userCountryData ? userCountryData.cca2 : 'US';

    return {callingCode, cca2};
  }
}

export default new DeviceService();
