import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text } from 'react-native';
import { SubmissionError, Field, InjectedFormProps, reduxForm, getFormValues } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';
import ErrorRequestText from '../../../../../shared/components/ErrorRequestText';

import email from '../../../../../shared/validators/email';
import required from '../../../../../shared/validators/required';
import { passwordLogin } from '../../../../../shared/validators/password';

import { LoginInput } from '../../../../../shared/services/auth.service';
import { RootState } from '../../../../../redux/store';
import { RequestError } from '../../../../../redux/request/states';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import navService from '../../../../../shared/services/nav.service';
import { IUserModel } from '../../../../../shared/models/user.model';

type LoginFormData = LoginInput;

interface StateProps {
  formValues: LoginFormData;
}

const mapStateToProps = (state: RootState): StateProps => ({
  formValues: getFormValues('login')(state) as LoginFormData,
});

type Props = StateProps & InjectedFormProps<LoginFormData>;

class LoginScreen extends React.Component<Props> {
  submitLogin = (values: LoginFormData, dispatch: Dispatch<authActions>) => {
    return new Promise<IUserModel>((resolve, reject) => {
      dispatch(authActions.submitLogin(values, resolve, reject));
    })
      .catch((error: RequestError) => {
        throw new SubmissionError<LoginFormData>({
          email: error.fields && error.fields.email ?
            error.fields.email[Object.keys(error.fields.email)[0]] : undefined,
          password: error.fields && error.fields.password ?
            error.fields.password[Object.keys(error.fields.password)[0]] : undefined,
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
    const {handleSubmit, formValues, submitting, error} = this.props;

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
          {
            error && <ErrorRequestText>
              {error}
            </ErrorRequestText>
          }
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
              disabled={
                !formValues ||
                !formValues.email ||
                !formValues.password ||
                submitting
              }
              onPress={handleSubmit(this.submitLogin)}
            />
          </View>
        </View>
        <View>
          <Text
            onPress={this.toForgotPassword}
            style={style.text}
          >
            {`Forgot password?`.toUpperCase()}
          </Text>
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

export default compose(
  reduxForm<LoginFormData>({
    form: 'login',
  }),
  connect<StateProps>(mapStateToProps),
)(LoginScreen);
