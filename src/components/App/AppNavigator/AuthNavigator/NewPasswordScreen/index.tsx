import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image } from 'react-native';
import { Field, InjectedFormProps, reduxForm, getFormValues } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';
import LogInLink from '../../../../../shared/components/LogInLink';

import required from '../../../../../shared/validators/required';
import { passwordRegistration, confirmPassword } from '../../../../../shared/validators/password';

import { ResetPasswordConfirmInput } from '../../../../../shared/services/auth.service';
import { ResetPasswordCodeFormData } from '../ResetPasswordCodeScreen';
import { RootState } from '../../../../../redux/store';

import { Actions as authActions } from '../../../../../redux/auth/AC';

export interface NewPasswordFormData {
  password: string;
  passwordConfirm: string;
}

interface StateProps {
  formValues: NewPasswordFormData;
  formValuesResetPasswordCode: ResetPasswordCodeFormData;
}

interface DispatchProps {
  newPassword(data: ResetPasswordConfirmInput): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  formValues: getFormValues('newPassword')(state) as NewPasswordFormData,
  formValuesResetPasswordCode: getFormValues('resetPasswordCode')(state) as ResetPasswordCodeFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<authActions>): DispatchProps => (
  {
    newPassword: (data) => {
      dispatch(authActions.submitNewPassword(data));
    },
  }
);

type Props = StateProps & DispatchProps & InjectedFormProps<NewPasswordFormData>;

class NewPasswordScreen extends React.Component<Props> {

  submitNewPassword = (values: NewPasswordFormData): void => {
    const {newPassword, formValuesResetPasswordCode} = this.props;
    const resetPasswordConfirmInput: ResetPasswordConfirmInput = {
      password: values.password,
      resetPasswordCode: formValuesResetPasswordCode.resetPasswordCode,
    };

    newPassword(resetPasswordConfirmInput);
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
          <View>
            <RegularButton
              title='SAVE PASSWORD'
              disabled={
                !formValues ||
                !formValues.password ||
                !formValues.passwordConfirm
              }
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
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(NewPasswordScreen);
