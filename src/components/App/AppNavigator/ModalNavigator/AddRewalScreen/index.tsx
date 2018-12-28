import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import style from './style';
import { linearGradientColors, mainColor, whiteColor } from '../../../../../app.style';

import {
  View, ScrollView, Text, TouchableOpacity,
  BackHandler, EmitterSubscription, Keyboard,
} from 'react-native';
import { Field, FieldArray, InjectedFormProps, reduxForm } from 'redux-form';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RegularButton from '../../../../../shared/components/RegularButton';
import LinearGradient from 'react-native-linear-gradient';
import BackImage from '../../../../../shared/components/BackImage';
import { Icon } from '../../../../../shared/components/Icon';
import OptionFieldsArray from '../../../../../shared/components/OptionFieldsArray';
import MultilineInput from '../../../../../shared/components/MultilineInput';

import { ProfileModel } from '../../../../../shared/models/profile.model';
import { RootState } from '../../../../../redux/store';
import { AddRewalButtonNavParams } from '../../../../../shared/components/AddRewalButton';
import { NavigationInjectedProps, NavigationScreenConfig, NavigationStackScreenOptions } from 'react-navigation';

import selectorsService from '../../../../../shared/services/selectors.service';

interface AddRewalFormData {
  title: string;
  options: string[];
}

interface StateProps {
  meProfile: ProfileModel | undefined;
}

const mapStateToProps = (state: RootState): StateProps => ({
  meProfile: selectorsService.getAuthorizedUserProfile(state),
});

interface State {
  isDateTimePickerVisible: boolean;
  isKeyboardVisible: boolean;
  expiredTime: number;
  optionCount: number;
}

type Props = StateProps & InjectedFormProps<AddRewalFormData> & NavigationInjectedProps<AddRewalButtonNavParams>;

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
      isKeyboardVisible: false,
      expiredTime: 24,
      optionCount: 2,
    };
  }

  keyboardWillShowSub: EmitterSubscription;
  keyboardWillHideSub: EmitterSubscription;

  keyboardWillShow = () => {
    this.setState({
      isKeyboardVisible: true,
    });
  }

  keyboardWillHide = () => {
    this.setState({
      isKeyboardVisible: false,
    });
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.props.initialize({options: ['', '']});
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const {navigate, getParam} = this.props.navigation;
    navigate(getParam('fromScreen'));
    return true;
  }

  onPressButtonCreate = () => {
  }

  toggleDateTimePicker = () => {
    this.setState((state) => ({
      isDateTimePickerVisible: !state.isDateTimePickerVisible,
    }));
  }

  render() {
    const {isDateTimePickerVisible, expiredTime} = this.state;

    return (
      <View style={{flex: 1}}>
        <ScrollView style={style.root} contentContainerStyle={style.scrollContainer}>
          <View style={style.bgImageContainer}>
            <LinearGradient
              colors={linearGradientColors}
              useAngle={true}
              angle={26}
              style={style.gradient}
            >
              <View style={style.multilineInputWraper}>
                <Field
                  name='title'
                  component={MultilineInput}
                  keyboard='default'
                  placeholder='TYPE YOUR QUESTION HERE'
                  maxLength={70}
                />
              </View>
              <View style={style.addPhotoButtonWraper}>
                <TouchableOpacity
                  style={style.addPhotoButton}
                >
                  <Text style={style.textAddPhoto}>ADD PHOTO</Text>
                  <Icon
                    name='photo'
                    size={11}
                    color={whiteColor}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <View style={style.modalBar}>
            <TouchableOpacity>
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
                  {`${expiredTime} HOURS`}
                </Text>
                <Text
                  style={style.textTimePickerButton}
                >
                  TAP TO SET DURATION
                </Text>
              </View>
              <Icon
                name='time'
                size={18}
                color={mainColor}
                style={style.timeIcon}
              />
            </TouchableOpacity>
            <DateTimePicker
              onConfirm={(date: Date) => console.log(new Date().getTime() - date.getTime())}
              onCancel={this.toggleDateTimePicker}
              isVisible={isDateTimePickerVisible}
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
        </ScrollView>
        {
          !this.state.isKeyboardVisible &&
          <View style={style.buttonCreate}>
            <RegularButton
              title='CREATE REWAL'
              fontSize={14}
              onPress={this.onPressButtonCreate}
            />
          </View>
        }
      </View>
    );
  }
}

export default compose(
  reduxForm<AddRewalFormData>({
    form: 'addRewal',
  }),
  connect<StateProps>(mapStateToProps),
)(AddRewalScreen);