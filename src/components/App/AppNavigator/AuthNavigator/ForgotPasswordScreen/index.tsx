import React from 'react';
import { Dispatch } from 'redux';
import style from './style';

import { View, ScrollView, Image } from 'react-native';
import { Field, InjectedFormProps, reduxForm, SubmissionError } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';
import LogInLink from '../../../../../shared/components/LogInLink';

import email from '../../../../../shared/validators/email';
import required from '../../../../../shared/validators/required';
import { getSubmissionError } from '../../../../../shared/validators/getSubmissionError';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import { RequestError } from '../../../../../redux/request/states';

export interface ForgotPasswordFormData {
  email: string;
}

type Props = InjectedFormProps<ForgotPasswordFormData>;

class ForgotPasswordScreen extends React.Component<Props> {
  submitResetPassword = (values: ForgotPasswordFormData, dispatch: Dispatch<authActions>) => {
    return new Promise<boolean>((resolve, reject) => {
      dispatch(authActions.submitResetPassword(values.email, resolve, reject));
    })
      .catch((error: RequestError) => {
        throw new SubmissionError<ForgotPasswordFormData>({
          email: getSubmissionError(error, 'email'),
          _error: error.message ? error.message : undefined,
        });
      });
  }

  render() {
    const {handleSubmit, invalid, submitting} = this.props;

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
              disabled={invalid || submitting}
              onPress={handleSubmit(this.submitResetPassword)}
            />
          </View>
        </View>
        <View style={style.loginWraper}>
          <LogInLink/>
        </View>
      </ScrollView>
    );
  }
}

export default reduxForm<ForgotPasswordFormData>({
  form: 'forgotPassword',
})(ForgotPasswordScreen);
