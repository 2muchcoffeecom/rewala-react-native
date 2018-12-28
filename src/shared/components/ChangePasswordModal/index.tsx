import React from 'react';
import { Field, InjectedFormProps, reduxForm, SubmissionError } from 'redux-form';
import { blackTextColor } from '../../../app.style';
import style from './style';

import { Modal, TouchableOpacity, View, Text } from 'react-native';
import Input from '../Input';
import RegularButton from '../RegularButton';
import { Icon } from '../Icon';

import { Dispatch } from 'redux';
import { RequestError } from '../../../redux/request/states';
import { UserResponse } from '../../models/user.model';
import { ChangePasswordInput } from '../../services/auth.service';

import { Actions as authActions } from '../../../redux/auth/AC';
import { Actions as toastActions } from '../../../redux/toast/AC';

import required from '../../validators/required';
import { confirmPasswordModal, passwordRegistration, passwordLogin } from '../../validators/password';
import { getSubmissionError } from '../../validators/getSubmissionError';
import ErrorRequestText from '../ErrorRequestText';

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
      .then((response) => {
        response && onCloseModal();
      })
      .catch((errors: RequestError) => {
        errors.message && dispatch(toastActions.showToast(errors.message));

        throw new SubmissionError<ChangePasswordFormData>({
          oldPassword: getSubmissionError(errors, 'oldPassword'),
          newPassword: getSubmissionError(errors, 'newPassword'),
          _error: errors.message ? errors.message : undefined,
        });
      });
  };

  const onCloseModal = () => {
    props.toggleVisibility();
    props.destroy();
  };

  const {isVisible, handleSubmit, error, invalid, submitting} = props;

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onCloseModal}>
      <View style={style.root}>
        <View style={style.modalContainer}>
          <TouchableOpacity
            onPress={onCloseModal}
            style={style.closeButton}
          >
            <Icon
              name='close-popup'
              size={15}
              color={blackTextColor}
            />
          </TouchableOpacity>
          <Text style={style.text}>Change Password</Text>
          <View style={style.fieldsWraper}>
            {
              error && <ErrorRequestText top={-20}>
                {error}
              </ErrorRequestText>
            }
            <View>
              <Field
                name='oldPassword'
                component={Input}
                placeholder='Old Password'
                validate={[required, passwordLogin]}
                isSecureTextEntry={true}
              />
            </View>
            <View>
              <Field
                name='newPassword'
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
                validate={[required, confirmPasswordModal]}
                isSecureTextEntry={true}
              />
            </View>
          </View>
          <View style={style.buttonWraper}>
            <RegularButton
              title='SAVE PASSWORD'
              fontSize={12}
              disabled={invalid || submitting}
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