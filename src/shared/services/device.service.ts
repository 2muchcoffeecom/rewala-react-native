import DeviceInfo from 'react-native-device-info';
import { getAllCountries, Country } from 'react-native-country-picker-modal';
import { from, Observable, ObservableInput } from 'rxjs';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';
import gql from 'graphql-tag';
import { user } from '../templates/user.template';
import { execute } from 'apollo-link';
import link from '../middlewares/link.middleware';

interface UserCountryData {
  callingCode: string;
  cca2: string;
}

export interface ContactInput {
  emails: string[];
  phones: string[];
}

interface IDeviceService {
  userLocaleCountryCode: string;
  getUserCountryData(): UserCountryData;
  getReadContactsPermission(): Observable<any>;
  getDeviceContacts(): Observable<any>;
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

  getReadContactsPermission() {
    return from(PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Address Book Access',
        message: 'The Rewala service needs to access your address book and sync your contacts list.',
      },
    ));
  }

  getDeviceContacts() {
    return from(new Promise((resolve, reject) => {
        Contacts.getAll((error, contacts) => {
          if (error) {
            return reject(error);
          }
          return resolve(contacts);
        });
      }),
    );
  }

  sendDeviceContactsToServer(input: ContactInput[]) {
    const operation = {
      query: gql`
          mutation importContacts($input: [ContactInput]) {
              importContacts(input: $input) ${user}
          }
      `,
      variables: {
        input,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }
}

export default new DeviceService();
