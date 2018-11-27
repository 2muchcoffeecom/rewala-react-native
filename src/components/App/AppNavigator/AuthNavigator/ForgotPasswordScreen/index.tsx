import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text } from 'react-native';
import { Field, InjectedFormProps, reduxForm, getFormValues } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';

import email from '../../../../../shared/validators/email';
import required from '../../../../../shared/validators/required';

import { RootState } from '../../../../../redux/store';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import navService from '../../../../../shared/services/nav.service';

export interface ForgotPasswordFormData {
  email: string;
}

interface StateProps {
  formValues: ForgotPasswordFormData;
}

interface DispatchProps {
  resetPassword(data: string): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  formValues: getFormValues('forgotPassword')(state) as ForgotPasswordFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<authActions>): DispatchProps => (
  {
    resetPassword: (data) => {
      dispatch(authActions.submitForgotPassword(data));
    },
  }
);

type Props = StateProps & DispatchProps & InjectedFormProps<ForgotPasswordFormData>;

class ForgotPasswordScreen extends React.Component<Props> {
  submitResetPassword = (values: ForgotPasswordFormData): void => {
    this.props.resetPassword(values.email);
  }

  toLoginScreen = () => {
    navService.navigate('LoginScreen');
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
          <View style={style.emailWraper}>
            <Field
              name='email'
              component={Input}
              keyboard='email-address'
              placeholder='Enter Your Email'
              validate={[required, email]}
            />
          </View>
          <View style={style.resetWraper}>
            <RegularButton
              title='RESET PASSWORD'
              disabled={!formValues || !formValues.email}
              onPress={handleSubmit(this.submitResetPassword)}
            />
          </View>
        </View>
        <View style={style.loginWraper}>
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
  reduxForm<ForgotPasswordFormData>({
    form: 'forgotPassword',
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(ForgotPasswordScreen);
