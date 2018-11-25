import React from 'react';
import { compose, Dispatch  } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text } from 'react-native';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';

import email from '../../../../../shared/validators/email';
import required from '../../../../../shared/validators/required';
import { passwordLogin } from '../../../../../shared/validators/password';

import { LoginInput } from '../../../../../shared/services/auth.service';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import navService from '../../../../../shared/services/nav.service';

type LoginFormData = LoginInput;

interface DispatchProps {
  login(data: LoginFormData): void;
}

const mapDispatchToProps = (dispatch: Dispatch<authActions>): DispatchProps => (
  {
    login: (data) => {
      dispatch(authActions.submitLogin(data));
    },
  }
);

type Props = DispatchProps & InjectedFormProps<LoginFormData>;

class LoginScreen extends React.Component<Props> {
  submitLogin = (values: LoginFormData): void => {
    this.props.login(values);
  }

  toForgotPassword = () => {
    navService.navigate('ForgotPasswordScreen');
  }

  toRegistrationScreen = () => {
    navService.navigate('RegistrationScreen');
  }

  render() {
    const {handleSubmit, pristine} = this.props;

    return (
      <ScrollView contentContainerStyle={style.root}>
        <View style={style.imageWraper}>
          <Image
            source={require('../../../../../../assets/logo.png')}
            resizeMode='contain'
            style={style.image}
          />
        </View>
        <View style={[style.wraper, style.emailWraper]}>
          <Field
            name='email'
            component={Input}
            keyboard='email-address'
            placeholder='Email'
            validate={[required, email]}
          />
        </View>
        <View style={[style.wraper, style.passwordWraper]}>
          <Field
            name='password'
            component={Input}
            placeholder='Password'
            validate={[required, passwordLogin]}
            isSecureTextEntry={true}
          />
        </View>
        <View style={[style.wraper, style.signInWraper]}>
          <RegularButton
            title='SIGN IN'
            disabled={pristine}
            onPress={handleSubmit(this.submitLogin)}
          />
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
  connect<null, DispatchProps>(null, mapDispatchToProps),
)(LoginScreen);
