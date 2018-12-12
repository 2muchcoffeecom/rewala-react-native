import React from 'react';
import { compose, Dispatch } from 'redux';
import { reduxForm, Field, InjectedFormProps, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';
import style from './style';

import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Input from '../../../../../../shared/components/Input';
import SwitchInput from '../../../../../../shared/components/SwitchInput';
import RegularButton from '../../../../../../shared/components/RegularButton';
import ChangePasswordModal from '../../../../../../shared/components/ChangePasswordModal';

import { ProfileModel } from '../../../../../../shared/models/profile.model';
import { RootState } from '../../../../../../redux/store';
import { UserModel, UserResponse } from '../../../../../../shared/models/user.model';
import { RequestError } from '../../../../../../redux/request/states';
import { UpdateUserInput } from '../../../../../../shared/services/user.service';

import selectorsService from '../../../../../../shared/services/selectors.service';
import { apiEndpoint } from '../../../../../../shared/constants/apiEndpoint';
import { Actions as usersActions } from '../../../../../../redux/users/AC';
import { Actions as toastActions } from '../../../../../../redux/toast/AC';

import required from '../../../../../../shared/validators/required';
import email from '../../../../../../shared/validators/email';
import { fullNameLetters } from '../../../../../../shared/validators/fullName';
import { maxLengthFullName, minLengthFullName } from '../../../../../../shared/validators/lenght';
import { getSubmissionError } from '../../../../../../shared/validators/getSubmissionError';

interface ProfileSettingsFormData {
  email: string;
  fullName: string;
  notifications: boolean;
}

interface StateProps {
  meProfile: ProfileModel | undefined;
  meUser: UserModel | undefined;
}

interface DispatchProps {
  showToast(message: string): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  meProfile: selectorsService.getAuthorizedUserProfile(state),
  meUser: selectorsService.getAuthorizedUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch<toastActions>): DispatchProps => (
  {
    showToast: (message) => {
      dispatch(toastActions.showToast(message));
    },
  }
);

interface State {
  avatar: {
    uri: string;
    type: string;
    name: string;
  };
  isVisibleModal: boolean;
}

type Props = StateProps & DispatchProps & InjectedFormProps<ProfileSettingsFormData>;

class ProfileSettingsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      avatar: {
        name: '',
        type: '',
        uri: '',
      },
      isVisibleModal: false,
    };
  }

  toggleModalVisibility = () => {
    this.setState((state) => ({
      isVisibleModal: !state.isVisibleModal,
    }));
  }

  submitProfileSettings = (values: ProfileSettingsFormData, dispatch: Dispatch<usersActions>) => {
    const updateUserInput: UpdateUserInput = {
      email: values.email,
      profileInput: {
        fullName: values.fullName,
        notifications: values.notifications,
        avatar: new ReactNativeFile(this.state.avatar),
      },
    };

    return new Promise<UserResponse>((resolve, reject) => {
      dispatch(usersActions.updateAuthorizedUser(updateUserInput, resolve, reject));
    })
      .catch((error: RequestError) => {
        throw new SubmissionError<ProfileSettingsFormData>({
          email: getSubmissionError(error, 'email'),
          fullName: getSubmissionError(error, 'fullName'),
          _error: error.message ? error.message : undefined,
        });
      });
  }

  onChangeAvatar = () => {
    const imagePickerOptions = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        this.props.showToast(response.error);
        return;
      }

      const {uri, fileName} = response;

      if (fileName) {
        const type = mime.lookup(fileName);
        this.setState({
          avatar: {uri, type, name: fileName},
        });
      }
    });
  }

  private setFormValues() {
    const {meProfile, meUser} = this.props;

    if (meProfile && meUser ) {
      const initialFormValue: ProfileSettingsFormData = {
        fullName: meProfile.fullName,
        email: meUser.email,
        notifications: meProfile.notifications,
      };

      this.props.initialize(initialFormValue);
    }
  }

  public componentDidMount() {
    this.setFormValues();
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      (prevProps.meProfile !== this.props.meProfile) ||
      (prevProps.meUser !== this.props.meUser)
    ) {
      this.setFormValues();
    }
  }

  render() {
    const {meProfile, handleSubmit} = this.props;
    const avatarUri = (this.state.avatar.uri !== '' && this.state.avatar.uri) ||
      (meProfile && meProfile.avatarPath && `${apiEndpoint}/graphql/${meProfile.avatarPath}`);

    return (
      <ScrollView contentContainerStyle={style.root}>
        <TouchableOpacity
          style={style.avatarButton}
          onPress={this.onChangeAvatar}
        >
          <View style={style.imageWraper}>
            <Image
              source={require('../../../../../../../assets/photo.png')}
              resizeMode='contain'
              style={style.iconPhoto}
            />
          </View>
          <Image
            source={
              avatarUri ?
                {uri: avatarUri} :
                require('../../../../../../../assets/avatar-placeholder.png')
            }
            resizeMode='contain'
            style={style.avatarImage}
          />
        </TouchableOpacity>
        <View style={style.textAccountWraper}>
          <Text style={style.textTitle}>Account</Text>
        </View>
        <View>
          <View style={style.inputWraper}>
            <Field
              name='email'
              component={Input}
              keyboard='email-address'
              placeholder='Email'
              validate={[required, email]}
            />
          </View>
          <Image
            source={require('../../../../../../../assets/pencil.png')}
            resizeMode='contain'
            style={style.iconPencil}
          />
        </View>
        <View>
          <View style={style.inputWraper}>
            <Field
              name='fullName'
              component={Input}
              placeholder='Full Name'
              validate={[
                required,
                fullNameLetters,
                minLengthFullName,
                maxLengthFullName,
              ]}
            />
          </View>
          <Image
            source={require('../../../../../../../assets/pencil.png')}
            resizeMode='contain'
            style={style.iconPencil}
          />
        </View>
        <View style={style.notificationWraper}>
          <View style={style.notificationImageWraper}>
            <Image
              source={require('../../../../../../../assets/notification-filled.png')}
              resizeMode='contain'
              style={style.notificationImage}
            />
            <Text style={style.text}>Notification</Text>
          </View>
          <Field
            name='notifications'
            component={SwitchInput}
          />
        </View>
        <TouchableOpacity
          style={style.changePasswordButton}
          onPress={this.toggleModalVisibility}
        >
          <Text style={[style.text, style.textLink]}>Change Password</Text>
        </TouchableOpacity>
        <View style={style.confirmButtonWraper}>
          <RegularButton
            title='CONFIRM CHANGES'
            onPress={handleSubmit(this.submitProfileSettings)}
            fontSize={12}
          />
        </View>
        <ChangePasswordModal
          isVisible={this.state.isVisibleModal}
          toggleVisibility={this.toggleModalVisibility}
        />
      </ScrollView>
    );
  }
}

export default compose(
  reduxForm<ProfileSettingsFormData>({
    form: 'ProfileSettings',
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(ProfileSettingsScreen);