import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image } from 'react-native';
import { Field, InjectedFormProps, reduxForm, getFormValues, SubmissionError } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';
import LogInLink from '../../../../../shared/components/LogInLink';

import required from '../../../../../shared/validators/required';
import { passwordRegistration, confirmPassword } from '../../../../../shared/validators/password';
import { getSubmissionError } from '../../../../../shared/validators/getSubmissionError';

import { ResetPasswordConfirmInput } from '../../../../../shared/services/auth.service';
import { ResetPasswordCodeFormData } from '../ResetPasswordCodeScreen';
import { RootState } from '../../../../../redux/store';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import { RequestError } from '../../../../../redux/request/states';
import { UserResponse } from '../../../../../shared/models/user.model';

export interface NewPasswordFormData {
  password: string;
  passwordConfirm: string;
}

interface StateProps {
  formValuesResetPasswordCode: ResetPasswordCodeFormData;
}

const mapStateToProps = (state: RootState): StateProps => ({
  formValuesResetPasswordCode: getFormValues('resetPasswordCode')(state) as ResetPasswordCodeFormData,
});

type Props = StateProps & InjectedFormProps<NewPasswordFormData>;

class NewPasswordScreen extends React.Component<Props> {

  submitNewPassword = (values: NewPasswordFormData, dispatch: Dispatch<authActions>) => {
    const {formValuesResetPasswordCode} = this.props;
    const resetPasswordConfirmInput: ResetPasswordConfirmInput = {
      password: values.password,
      resetPasswordCode: formValuesResetPasswordCode.resetPasswordCode,
    };

    return new Promise<UserResponse>((resolve, reject) => {
      dispatch(authActions.submitNewPassword(resetPasswordConfirmInput, resolve, reject));
    })
      .catch((error: RequestError) => {
        throw new SubmissionError<NewPasswordFormData>({
          password: getSubmissionError(error, 'password'),
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
          <View>
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
              validate={[required, confirmPassword]}
              isSecureTextEntry={true}
            />
          </View>
          <View style={style.buttonWraper}>
            <RegularButton
              title='SAVE PASSWORD'
              disabled={invalid || submitting}
              onPress={handleSubmit(this.submitNewPassword)}
            />
          </View>
        </View>
        <View style={style.logInWraper}>
          <LogInLink/>
        </View>
      </ScrollView>
    );
  }
}

export default compose(
  reduxForm<NewPasswordFormData>({
    form: 'newPassword',
  }),
  connect<StateProps>(mapStateToProps),
)(NewPasswordScreen);
