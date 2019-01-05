import React from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import withKeyboard, { KeyboardInjectedProps } from '../../../../../shared/HOC/withKeyboard';
import style from './style';
import { linearGradientColors, mainColor, whiteColor } from '../../../../../app.style';

import {
  View, ScrollView, Text, TouchableOpacity, Image, SafeAreaView,
  BackHandler, Dimensions,
} from 'react-native';
import { Field, FieldArray, InjectedFormProps, reduxForm } from 'redux-form';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RegularButton from '../../../../../shared/components/RegularButton';
import LinearGradient from 'react-native-linear-gradient';
import BackImage from '../../../../../shared/components/BackImage';
import { Icon } from '../../../../../shared/components/Icon';
import OptionFieldsArray from '../../../../../shared/components/OptionFieldsArray';
import MultilineInput from '../../../../../shared/components/MultilineInput';
import QuestionTitleColorButtonsGroup from '../../../../../shared/components/QuestionTitleColorButtonsGroup';
import ImagePickerModal, { ImagePickerInput } from '../../../../../shared/components/ImagePickerModal';
import InviteFriendsModal from '../../../../../shared/components/InviteFriendsModal';
import AddDeletePhotoButton from '../../../../../shared/components/AddDeletePhotoButton';
import AvatarsInAddRewal from '../../../../../shared/components/AvatarsInAddRewal';

import { ProfileModel } from '../../../../../shared/models/profile.model';
import { RootState } from '../../../../../redux/store';
import { AddRewalButtonNavParams } from '../../../../../shared/components/AddRewalButton';
import { NavigationInjectedProps, NavigationScreenConfig, NavigationStackScreenOptions } from 'react-navigation';
import { Options } from 'react-native-image-crop-picker';

import selectorsService from '../../../../../shared/services/selectors.service';
import { Actions as friendsActions } from '../../../../../redux/friends/AC';

interface AddRewalFormData {
  title: string;
  options: string[];
}

interface StateProps {
  myFriendsProfiles: ProfileModel[];
}

interface DispatchProps {
  getMyFriends(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  myFriendsProfiles: selectorsService.getMyFriendsProfiles(state),
});

const mapDispatchToProps = (dispatch: Dispatch<friendsActions>): DispatchProps => (
  {
    getMyFriends: () => {
      dispatch(friendsActions.getMyFriends());
    },
  }
);

interface State {
  isDateTimePickerVisible: boolean;
  isVisibleImagePickerModal: boolean;
  isVisibleInviteFriendsModal: boolean;
  expiredTime: number;
  titleColor: string;
  image: ImagePickerInput;
  invitedFriends: string[];
}

type Props = StateProps &
  DispatchProps &
  InjectedFormProps<AddRewalFormData> &
  NavigationInjectedProps<AddRewalButtonNavParams> &
  KeyboardInjectedProps;

class AddRewalScreen extends React.Component<Props, State> {
  static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = (
    {navigation},
  ): NavigationStackScreenOptions => {
    return {
      headerLeft: () => {
        const onPressBackButton = () => {
          navigation.navigate(navigation.getParam('fromScreen'));
        };

        return (
          <TouchableOpacity
            onPress={onPressBackButton}
            style={{paddingLeft: 16}}
          >
            <BackImage/>
          </TouchableOpacity>
        );
      },
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      isVisibleImagePickerModal: false,
      isVisibleInviteFriendsModal: false,
      expiredTime: 24,
      titleColor: whiteColor,
      image: {
        name: '',
        type: '',
        uri: '',
      },
      invitedFriends: [],
    };
  }

  componentDidMount() {
    this.props.getMyFriends();
    this.props.initialize({options: ['', '']});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const {navigate, getParam} = this.props.navigation;
    navigate(getParam('fromScreen'));
    return true;
  }

  onPressButtonCreate = () => {
  }

  onPressAddPhotoButton = () => {
    this.toggleImagePickerModalVisibility();
  }

  onPressDeletePhotoButton = () => {
    this.setState({
      image: {
        uri: '',
        type: '',
        name: '',
      },
    });
  }

  selectImage = (image: ImagePickerInput) => {
    this.setState({image});
  }

  inviteFriends = (data: string[]) => {
    this.setState({
      invitedFriends: data,
    });
  }

  toggleImagePickerModalVisibility = () => {
    this.setState((state) => ({
      isVisibleImagePickerModal: !state.isVisibleImagePickerModal,
    }));
  }

  toggleInviteFriendsModalVisibility = () => {
    this.setState((state) => ({
      isVisibleInviteFriendsModal: !state.isVisibleInviteFriendsModal,
    }));
  }

  toggleDateTimePicker = () => {
    this.setState((state) => ({
      isDateTimePickerVisible: !state.isDateTimePickerVisible,
    }));
  }

  changeTitleColor = (color: string) => {
    this.setState({titleColor: color});
  }

  getPickerOptions = (): Options => {
    const aspect = Dimensions.get('window').width;

    return {
      width: aspect,
      height: aspect * 0.5333,
      cropping: true,
      multiple: false,
    };
  }

  getTitleWithImageBody() {
    const content = (
      <React.Fragment>
        <View style={style.questionTitleColorButtonsGroupWraper}>
          <QuestionTitleColorButtonsGroup
            activeColor={this.state.titleColor}
            onChangeColor={this.changeTitleColor}
          />
        </View>
        <View style={style.multilineInputWraper}>
          <Field
            name='title'
            component={MultilineInput}
            keyboard='default'
            placeholder='TYPE YOUR QUESTION HERE'
            maxLength={70}
            color={this.state.titleColor}
          />
        </View>
        <View style={style.addPhotoButtonWraper}>
          <AddDeletePhotoButton
            isAddedPhoto={this.state.image.uri !== ''}
            onPressAddPhotoButton={this.onPressAddPhotoButton}
            onPressDeletePhotoButton={this.onPressDeletePhotoButton}
          />
        </View>
      </React.Fragment>
    );

    if (this.state.image.uri !== '') {
      return (
        <View style={style.gradient}>
          {content}
          <Image
            source={{uri: this.state.image.uri}}
            resizeMode='cover'
            style={style.backgroundImage}
          />
        </View>
      );
    } else {
      return (
        <LinearGradient
          colors={linearGradientColors}
          useAngle={true}
          angle={26}
          style={style.gradient}
        >
          {content}
        </LinearGradient>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={style.root}>
        <ScrollView style={style.scrollRoot} contentContainerStyle={style.scrollContainer}>
          <View style={style.bgImageContainer}>
            {this.getTitleWithImageBody()}
          </View>
          <View style={style.modalBar}>
            <TouchableOpacity
              onPress={this.toggleInviteFriendsModalVisibility}
            >
              <Text style={style.textInviteFriendsButton}>
                INVITE FRIENDS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggleDateTimePicker}
              style={style.timePickerButton}
            >
              <View>
                <Text
                  style={style.textBoldTimePickerButton}
                >
                  {`${this.state.expiredTime} HOURS`}
                </Text>
                <Text
                  style={style.textTimePickerButton}
                >
                  TAP TO SET DURATION
                </Text>
              </View>
              <Icon
                name='time'
                size={24}
                color={mainColor}
                style={style.timeIcon}
              />
            </TouchableOpacity>
            <DateTimePicker
              onConfirm={(date: Date) => console.log(new Date().getTime() - date.getTime())}
              onCancel={this.toggleDateTimePicker}
              isVisible={this.state.isDateTimePickerVisible}
              mode='datetime'
              datePickerModeAndroid='spinner'
              minimumDate={new Date()}
              is24Hour={true}
            />
          </View>
          <View style={style.optionWraper}>
            <FieldArray
              name='options'
              component={OptionFieldsArray}
            />
          </View>
          <View style={style.invitedUserAvatars}>
            <AvatarsInAddRewal
              profilesData={this.props.myFriendsProfiles}
              invitedFriends={this.state.invitedFriends}
            />
          </View>
        </ScrollView>
        {
          !this.props.isKeyboardVisible &&
          <View style={style.buttonCreate}>
            <RegularButton
              title='CREATE REWAL'
              fontSize={14}
              onPress={this.onPressButtonCreate}
            />
          </View>
        }
        <ImagePickerModal
          title='Select Photo'
          isVisible={this.state.isVisibleImagePickerModal}
          toggleVisibility={this.toggleImagePickerModalVisibility}
          selectImage={this.selectImage}
          pickerOptions={this.getPickerOptions()}
        />
        <InviteFriendsModal
          myFriendsProfiles={this.props.myFriendsProfiles}
          isVisible={this.state.isVisibleInviteFriendsModal}
          toggleVisibility={this.toggleInviteFriendsModalVisibility}
          confirmSelection={this.inviteFriends}
        />
      </SafeAreaView>
    );
  }
}

export default compose(
  withKeyboard,
  reduxForm<AddRewalFormData>({
    form: 'addRewal',
  }),
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps),
)(AddRewalScreen);