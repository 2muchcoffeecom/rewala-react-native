import React from 'react';
import { connect } from 'react-redux';
import style from './style';
import { Image } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigatorConfig,
  NavigationScreenConfig,
  NavigationBottomTabScreenOptions,
  TabBarBottomProps,
} from 'react-navigation';
import { RootState } from '../../../../redux/store';
import { Dispatch } from 'redux';

import { Actions as usersActions } from '../../../../redux/users/AC';

import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import SearchNavigator from './SearchNavigator';

interface CustomBottomTabNavigatorConfig extends BottomTabNavigatorConfig {
  defaultNavigationOptions: NavigationScreenConfig<NavigationBottomTabScreenOptions>;
}

const Navigator = createBottomTabNavigator({
  HomeNavigator,
  SearchNavigator,
  NotificationNavigator: HomeNavigator,
  ProfileNavigator,
}, {
  initialRouteName: 'HomeNavigator',

  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused}) => {
      const {routeName} = navigation.state;

      if (routeName === 'HomeNavigator') {
        return (
          <Image
            source={
              focused ?
                require('../../../../../assets/home-filled.png') :
                require('../../../../../assets/home.png')
            }
            resizeMode='contain'
            style={style.homeImage}
          />
        );
      } else if (routeName === 'SearchNavigator') {
        return (
          <Image
            source={
              focused ?
                require('../../../../../assets/search-filled.png') :
                require('../../../../../assets/search.png')
            }
            resizeMode='contain'
            style={style.searchImage}
          />
        );
      } else if (routeName === 'NotificationNavigator') {
        return (
          <Image
            source={
              focused ?
                require('../../../../../assets/notification-filled.png') :
                require('../../../../../assets/notification.png')
            }
            resizeMode='contain'
            style={style.notificationImage}
          />
        );
      } else {
        return (
          <Image
            source={
              focused ?
                require('../../../../../assets/profile-filled.png') :
                require('../../../../../assets/profile.png')
            }
            resizeMode='contain'
            style={style.profileImage}
          />
        );
      }
    },
  }),
  tabBarOptions: {
    showLabel: false,
    tabStyle: style.tabStyle,
    style: style.style,
  },
} as CustomBottomTabNavigatorConfig);

interface StateProps {
  authorisedUserId: string | null;
}

interface DispatchProps {
  getAuthorisedUser(): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  authorisedUserId: state.auth.authorizedUserId,
});

const mapDispatchToProps = (dispatch: Dispatch<usersActions>): DispatchProps => (
  {
    getAuthorisedUser: () => {
      dispatch(usersActions.getAuthorizedUser());
    },
  }
);

type Props = StateProps & DispatchProps & TabBarBottomProps;

class MainNavigator extends React.Component<Props> {
  static router = Navigator.router;

  componentDidMount() {
    if (this.props.authorisedUserId === '') {
      this.props.getAuthorisedUser();
    }
  }

  render() {
    return <Navigator navigation={this.props.navigation}/>;
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(MainNavigator);