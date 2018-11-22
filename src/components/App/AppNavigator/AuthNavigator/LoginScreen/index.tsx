import React, { Dispatch } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView } from 'react-native';
import { Field, FormAction, InjectedFormProps, reduxForm } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';

import email from '../../../../../shared/validators/email';
import required from '../../../../../shared/validators/required';
import { passwordLogin } from '../../../../../shared/validators/password';

import { LoginInput } from '../../../../../shared/services/auth.service';
import navService from '../../../../../shared/services/nav.service';

type LoginFormData = LoginInput;

interface StateProps {
}

interface DispatchProps {
}

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<FormAction | Actions | toastActions>): DispatchProps => (
);

type Props = StateProps & DispatchProps & InjectedFormProps<LoginFormData>;

class LoginScreen extends React.Component<Props> {
  submitLogin = (values: LoginFormData): void => {

  }

  forgotPassword = () => {
    navService.navigate('ForgotPasswordScreen');
  }

  toRegistrationScreen = () => {
    navService.navigate('RegistrationScreen');
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <View>
        <View>
          <Image
            source={require('../../../../../../assets/logo.png')}
            resizeMode='contain'
            // style={style.image}
          />
        </View>
        <View>
          <Field
            name='email'
            component={Input}
            keyboard='email-address'
            placeholder='Email'
            validate={[required, email]}
          />
        </View>
        <View>
          <Field
            name='password'
            component={Input}
            placeholder='Email'
            validate={[required, passwordLogin]}
          />
        </View>
        <View>
          <RegularButton
            title='Sign in'
            onPress={handleSubmit(this.submitLogin)}
          />
        </View>
        <View>
          <Text
            onPress={this.forgotPassword}
          >
            Forgot password?
          </Text>
        </View>
        <View>
          <Text>Do not have an account?</Text>
          <Text
            onPress={this.toRegistrationScreen}
          >
            Sign Up
          </Text>
        </View>
      </View>
    );
  }
}

export default compose(
  reduxForm<LoginFormData>({
    form: 'login',
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(LoginScreen);
