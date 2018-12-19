import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { Field, InjectedFormProps, reduxForm, getFormValues, SubmissionError } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';
import LogInLink from '../../../../../shared/components/LogInLink';
import ErrorRequestText from '../../../../../shared/components/ErrorRequestText';

import { getSubmissionError } from '../../../../../shared/validators/getSubmissionError';

import { RootState } from '../../../../../redux/store';
import { ForgotPasswordFormData } from '../ForgotPasswordScreen';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import { RequestError } from '../../../../../redux/request/states';

export interface ResetPasswordCodeFormData {
  resetPasswordCode: string;
}

interface StateProps {
  forgotPasswordFormValues: ForgotPasswordFormData;
}

interface DispatchProps {
  resendCode(data: string): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  forgotPasswordFormValues: getFormValues('forgotPassword')(state) as ForgotPasswordFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<authActions>): DispatchProps => (
  {
    resendCode: (data) => {
      dispatch(authActions.submitResetPassword(data));
    },
  }
);

type Props = StateProps & DispatchProps & InjectedFormProps<ResetPasswordCodeFormData>;

class ResetPasswordCodeScreen extends React.Component<Props> {
  submitResetPasswordCode = (values: ResetPasswordCodeFormData, dispatch: Dispatch<authActions>) => {
    return new Promise<boolean>((resolve, reject) => {
      dispatch(authActions.submitResetPasswordCode(values.resetPasswordCode, resolve, reject));
    })
      .catch((error: RequestError) => {
        throw new SubmissionError<ResetPasswordCodeFormData>({
          resetPasswordCode: getSubmissionError(error, 'resetPasswordCode'),
          _error: error.message ? error.message : undefined,
        });
      });
  }

  resendCode = () => {
    const {resendCode, forgotPasswordFormValues} = this.props;

    resendCode(forgotPasswordFormValues.email);
  }

  render() {
    const {handleSubmit, error, submitting} = this.props;

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
              name='resetPasswordCode'
              component={Input}
              maxLength={8}
              placeholder='Enter Code From Email'
            />
          </View>
          <View style={style.textCheckEmailWraper}>
            <Text style={style.text}>
              The verification code was sent to your account email address.
              Check your email inbox and enter the code to the field above.
            </Text>
          </View>
          <View style={style.changePasswordWraper}>
            <RegularButton
              title='CHANGE PASSWORD'
              disabled={submitting}
              onPress={handleSubmit(this.submitResetPasswordCode)}
            />
          </View>
          <TouchableOpacity onPress={this.resendCode}>
            <Text
              style={[style.text, style.textLink]}
            >
              {'Resend code'.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.loginWraper}>
          <LogInLink/>
        </View>
      </ScrollView>
    );
  }
}

export default compose(
  reduxForm<ResetPasswordCodeFormData>({
    form: 'resetPasswordCode',
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(ResetPasswordCodeScreen);
