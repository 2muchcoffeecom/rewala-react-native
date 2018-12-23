import React from 'react';
import { Dispatch } from 'redux';
import style from './style';

import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { SubmissionError, Field, InjectedFormProps, reduxForm } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';

import email from '../../../../../shared/validators/email';
import required from '../../../../../shared/validators/required';
import { passwordLogin } from '../../../../../shared/validators/password';
import { getSubmissionError } from '../../../../../shared/validators/getSubmissionError';

import { LoginInput } from '../../../../../shared/services/auth.service';
import { RequestError } from '../../../../../redux/request/states';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import navService from '../../../../../shared/services/nav.service';
import { UserResponse } from '../../../../../shared/models/user.model';

type LoginFormData = LoginInput;

type Props = InjectedFormProps<LoginFormData>;

class LoginScreen extends React.Component<Props> {
  submitLogin = (values: LoginFormData, dispatch: Dispatch<authActions>) => {
    return new Promise<UserResponse>((resolve, reject) => {
      dispatch(authActions.submitLogin(values, resolve, reject));
    })
      .catch((error: RequestError) => {
        throw new SubmissionError<LoginFormData>({
          email: getSubmissionError(error, 'email'),
          password: getSubmissionError(error, 'password'),
          _error: error.message ? error.message : undefined,
        });
      });
  }

  toForgotPassword = () => {
    navService.navigate('ForgotPasswordScreen');
  }

  toRegistrationScreen = () => {
    navService.navigate('RegistrationScreen');
  }

  render() {
    const {handleSubmit, submitting, invalid} = this.props;

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
          <View>
            <Field
              name='email'
              component={Input}
              keyboard='email-address'
              placeholder='Email'
              validate={[required, email]}
            />
          </View>
          <View style={style.passwordWraper}>
            <Field
              name='password'
              component={Input}
              placeholder='Password'
              validate={[required, passwordLogin]}
              isSecureTextEntry={true}
            />
          </View>
          <View style={style.signInWraper}>
            <RegularButton
              title='SIGN IN'
              disabled={invalid || submitting}
              onPress={handleSubmit(this.submitLogin)}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={this.toForgotPassword}>
            <Text style={style.text}>
              {`Forgot password?`.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.singUpWraper}>
          <Text style={style.text}>
            {'Do not have an account? '.toUpperCase()}
            <Text
              onPress={this.toRegistrationScreen}
              style={style.textLink}
            >
              SIGN UP
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default reduxForm<LoginFormData>({
  form: 'login',
})(LoginScreen);
