import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text } from 'react-native';
import { Field, InjectedFormProps, reduxForm, getFormValues } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';
import CountryPicker from 'react-native-country-picker-modal';

import email from '../../../../../shared/validators/email';
import { fullNameLetters } from '../../../../../shared/validators/fullName';
import { minLengthFullName } from '../../../../../shared/validators/minLenght';
import { maxLengthFullName } from '../../../../../shared/validators/maxLenght';
import { phone } from '../../../../../shared/validators/phone';
import { validate } from '../../../../../shared/validators/confirmPassword';
import required from '../../../../../shared/validators/required';
import { passwordRegistration } from '../../../../../shared/validators/password';

import { UserInput } from '../../../../../shared/services/auth.service';
import { RootState } from '../../../../../redux/store';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import navService from '../../../../../shared/services/nav.service';
import deviceService from '../../../../../shared/services/device.service';

export interface RegistrationFormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface StateProps {
  formValues: RegistrationFormData;
}

interface DispatchProps {
  registration(data: UserInput): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  formValues: getFormValues('registration')(state) as RegistrationFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<authActions>): DispatchProps => (
  {
    registration: (data) => {
      dispatch(authActions.submitRegistration(data));
    },
  }
);

interface State {
  cca2: string;
  callingCode: string;
}

type Props = StateProps & DispatchProps & InjectedFormProps<RegistrationFormData>;

class RegistrationScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cca2: deviceService.userLocaleCountryCode,
      callingCode: `+${deviceService.getUserCountryData().callingCode}`,
    };
  }

  submitRegistration = (values: RegistrationFormData): void => {
    const userInput: UserInput = {
      email: values.email,
      password: values.password,
      profileInput: {
        fullName: values.fullName,
        phone: this.state.callingCode + values.phone,
      },
    };

    this.props.registration(userInput);
  }

  toLoginScreen = () => {
    navService.navigate('LoginScreen');
  }

  changeCountry = (value: any) => {
    this.setState({
      cca2: value.cca2,
      callingCode: value.callingCode ? `+${value.callingCode}` : '',
    });
  }

  render() {
    const {handleSubmit, formValues} = this.props;

    return (
      <ScrollView contentContainerStyle={style.root}>
        <View style={style.imageWraper}>
          <Image
            source={require('../../../../../../assets/logo.png')}
            resizeMode='contain'
            style={style.image}
          />
        </View>
        <View style={style.wraper}>
          <View style={style.fieldWraper}>
            <Field
              name='fullName'
              component={Input}
              placeholder='Full Name'
              validate={[
                required,
                fullNameLetters,
                minLengthFullName,
                maxLengthFullName,
              ]}
            />
          </View>
          <View style={style.phoneWraper}>
            <View style={style.countryPickerWraper}>
              <CountryPicker
                onChange={this.changeCountry}
                cca2={this.state.cca2}
                flagType='flat'
                filterable={true}
                hideAlphabetFilter={true}
                showCallingCode={true}
                translation='eng'
                styles={{
                  imgStyle: style.countryPickerImg,
                }}
              />
              <Text style={style.countryPickerText}>{this.state.callingCode}</Text>
            </View>
            <View style={style.phoneField}>
              <Field
                name='phone'
                component={Input}
                keyboard='phone-pad'
                placeholder='Phone Number'
                validate={[required, phone]}
              />
            </View>
          </View>
          <View style={style.fieldWraper}>
            <Field
              name='email'
              component={Input}
              keyboard='email-address'
              placeholder='Email'
              validate={[required, email]}
            />
          </View>
          <View style={style.fieldWraper}>
            <Field
              name='password'
              component={Input}
              placeholder='Password'
              validate={[required, passwordRegistration]}
              isSecureTextEntry={true}
            />
          </View>
          <View style={style.passwordConfirmWraper}>
            <Field
              name='passwordConfirm'
              component={Input}
              placeholder='Confirm Password'
              validate={required}
              isSecureTextEntry={true}
            />
          </View>
          <View>
            <RegularButton
              title='SIGN UP'
              disabled={
                !formValues ||
                !formValues.fullName ||
                !formValues.phone ||
                !formValues.email ||
                !formValues.password ||
                !formValues.passwordConfirm
              }
              onPress={handleSubmit(this.submitRegistration)}
            />
          </View>
        </View>
        <View style={style.singInWraper}>
          <Text style={style.text}>
            {'Already have an account? '.toUpperCase()}
            <Text
              onPress={this.toLoginScreen}
              style={style.textLink}
            >
              LOG IN
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default compose(
  reduxForm<RegistrationFormData>({
    form: 'registration',
    validate,
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(RegistrationScreen);
