import React from 'react';
import { Field, InjectedFormProps, reduxForm, SubmissionError } from 'redux-form';
import style from './style';

import { Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import Input from '../Input';
import RegularButton from '../RegularButton';

import {
  NewPasswordFormData as ChangePasswordFormData,
} from '../../../components/App/AppNavigator/AuthNavigator/NewPasswordScreen';
import { Dispatch } from 'redux';
import { Actions as authActions } from '../../../redux/auth/AC';
import { RequestError } from '../../../redux/request/states';

import required from '../../validators/required';
import { confirmPassword, passwordRegistration } from '../../validators/password';
import { getSubmissionError } from '../../validators/getSubmissionError';

interface OwnProps {
  isVisible: boolean;
  toggleVisibility(): void;
}

type Props = OwnProps & InjectedFormProps<ChangePasswordFormData, OwnProps>;

const ChangePasswordModal: React.FunctionComponent<Props> = (props) => {
  const submitChangePassword = (values: ChangePasswordFormData, dispatch: Dispatch<authActions>) => {
    // const resetPasswordConfirmInput: ResetPasswordConfirmInput = {
    //   password: values.password,
    //   resetPasswordCode: formValuesResetPasswordCode.resetPasswordCode,
    // };
    //
    // return new Promise<UserResponse>((resolve, reject) => {
    //   dispatch(authActions.submitNewPassword(resetPasswordConfirmInput, resolve, reject));
    // })
    //   .catch((error: RequestError) => {
    //     throw new SubmissionError<ChangePasswordFormData>({
    //       password: getSubmissionError(error, 'password'),
    //       _error: error.message ? error.message : undefined,
    //     });
    //   });
  };

  const {isVisible, handleSubmit, toggleVisibility} = props;

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleVisibility}>
      <View style={style.root}>
        <View style={style.modalContainer}>
          <TouchableOpacity
            onPress={toggleVisibility}
            style={style.closeButton}
          >
            <Image
              source={require('../../../../assets/closing-cross.png')}
              resizeMode='contain'
              style={style.image}
            />
          </TouchableOpacity>
          <Text style={style.text}>Change Password</Text>
          <View style={style.fieldsWraper}>
            <View>
              <Field
                name='oldPassword'
                component={Input}
                placeholder='Old Password'
                validate={[required, passwordRegistration]}
                isSecureTextEntry={true}
              />
            </View>
            <View>
              <Field
                name='password'
                component={Input}
                placeholder='New Password'
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
          </View>
          <View style={style.buttonWraper}>
            <RegularButton
              title='SAVE PASSWORD'
              fontSize={12}
              // disabled={invalid || submitting}
              onPress={handleSubmit(submitChangePassword)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default reduxForm<ChangePasswordFormData, OwnProps>({
  form: 'changePassword',
})(ChangePasswordModal);