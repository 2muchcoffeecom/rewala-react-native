import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text } from 'react-native';
import { Field, InjectedFormProps, reduxForm, getFormValues } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';
import LogInLink from '../../../../../shared/components/LogInLink';

import { resetPasswordCode } from '../../../../../shared/validators/resetPasswordCode';

import { RootState } from '../../../../../redux/store';
import { ForgotPasswordFormData } from '../ForgotPasswordScreen';

import { Actions as authActions } from '../../../../../redux/auth/AC';

export interface ResetPasswordCodeFormData {
  resetPasswordCode: string;
}

interface StateProps {
  formValues: ResetPasswordCodeFormData;
  forgotPasswordFormValues: ForgotPasswordFormData;
}

interface DispatchProps {
  verifyCode(data: string): void;
  resendCode(data: string): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  formValues: getFormValues('resetPasswordCode')(state) as ResetPasswordCodeFormData,
  forgotPasswordFormValues: getFormValues('forgotPassword')(state) as ForgotPasswordFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<authActions>): DispatchProps => (
  {
    verifyCode: (data) => {
      dispatch(authActions.submitResetPasswordCode(data));
    },
    resendCode: (data) => {
      dispatch(authActions.submitResetPassword(data));
    },
  }
);

type Props = StateProps & DispatchProps & InjectedFormProps<ResetPasswordCodeFormData>;

class ResetPasswordCodeScreen extends React.Component<Props> {
  submitResetPasswordCode = (values: ResetPasswordCodeFormData): void => {
    this.props.verifyCode(values.resetPasswordCode);
  }

  resendCode = () => {
    const {resendCode, forgotPasswordFormValues} = this.props;

    resendCode(forgotPasswordFormValues.email);
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
          <View>
            <Field
              name='resetPasswordCode'
              component={Input}
              maxLength={8}
              placeholder='Enter Code From Email'
              validate={resetPasswordCode}
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
              disabled={!formValues || !formValues.resetPasswordCode}
              onPress={handleSubmit(this.submitResetPasswordCode)}
            />
          </View>
          <Text
            style={[style.text, style.textLink]}
            onPress={this.resendCode}
          >
            {'Resend code'.toUpperCase()}
          </Text>
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
