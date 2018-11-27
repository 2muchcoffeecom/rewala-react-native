import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import style from './style';

import { View, ScrollView, Image, Text } from 'react-native';
import { Field, InjectedFormProps, reduxForm, getFormValues } from 'redux-form';
import Input from '../../../../../shared/components/Input';
import RegularButton from '../../../../../shared/components/RegularButton';

import { verificationCode } from '../../../../../shared/validators/verificationCode';

import { RootState } from '../../../../../redux/store';

import { Actions as authActions } from '../../../../../redux/auth/AC';
import navService from '../../../../../shared/services/nav.service';

interface VerificationCodeFormData {
  code: string;
}

interface StateProps {
  formValues: VerificationCodeFormData;
}

interface DispatchProps {
  verifyCode(data: VerificationCodeFormData): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  formValues: getFormValues('resetPassword')(state) as VerificationCodeFormData,
});

const mapDispatchToProps = (dispatch: Dispatch<authActions>): DispatchProps => (
  {
    verifyCode: (data) => {
      dispatch(authActions.submitVerifyCode(data));
    },
  }
);

type Props = StateProps & DispatchProps & InjectedFormProps<VerificationCodeFormData>;

class VerificationCodeScreen extends React.Component<Props> {
  submitVerifyCode = (values: VerificationCodeFormData): void => {
    this.props.verifyCode(values);
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
          <View>
            <Field
              name='code'
              component={Input}
              maxLength={8}
              placeholder='Enter Code From Email'
              validate={verificationCode}
            />
          </View>
          <View style={style.textCheckEmailWraper}>
            <Text style={[style.text, style.textCheckEmail]}>
              The verification code was sent to your account email address.
              Check your email inbox and enter the code to the field above.
            </Text>
          </View>
          <View style={style.changePasswordWraper}>
            <RegularButton
              title='CHANGE PASSWORD'
              disabled={!formValues || !formValues.code}
              onPress={handleSubmit(this.submitVerifyCode)}
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
  reduxForm<VerificationCodeFormData>({
    form: 'verificationCode',
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(VerificationCodeScreen);
