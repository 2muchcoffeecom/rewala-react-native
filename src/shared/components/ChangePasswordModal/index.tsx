import React from 'react';
import { Field, InjectedFormProps, reduxForm, SubmissionError } from 'redux-form';
import style from './style';

import { Modal, TouchableOpacity, View, Text, Image } from 'react-native';
import Input from '../Input';
import RegularButton from '../RegularButton';

import { Dispatch } from 'redux';
import { RequestError } from '../../../redux/request/states';
import { UserResponse } from '../../models/user.model';
import { ChangePasswordInput } from '../../services/auth.service';

import { Actions as authActions } from '../../../redux/auth/AC';
import { Actions as toastActions } from '../../../redux/toast/AC';

import required from '../../validators/required';
import { confirmPassword, passwordRegistration } from '../../validators/password';
import { getSubmissionError } from '../../validators/getSubmissionError';

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

interface OwnProps {
  isVisible: boolean;
  toggleVisibility(): void;
}

type Props = OwnProps & InjectedFormProps<ChangePasswordFormData, OwnProps>;

const ChangePasswordModal: React.FunctionComponent<Props> = (props) => {
  const submitChangePassword = (
    values: ChangePasswordFormData,
    dispatch: Dispatch<authActions | toastActions>,
  ) => {
    const changePasswordInput: ChangePasswordInput = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    return new Promise<UserResponse>((resolve, reject) => {
      dispatch(authActions.submitChangePassword(changePasswordInput, resolve, reject));
    })
      .catch((error: RequestError) => {
        error.message && dispatch(toastActions.showToast(error.message));

        throw new SubmissionError<ChangePasswordFormData>({
          oldPassword: getSubmissionError(error, 'oldPassword'),
          newPassword: getSubmissionError(error, 'newPassword'),
          _error: error.message ? error.message : undefined,
        });
      });
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