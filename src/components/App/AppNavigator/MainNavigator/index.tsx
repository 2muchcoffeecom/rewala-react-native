import React from 'react';
import { connect } from 'react-redux';
import style from './style';
import { mainColor, greyColorIcon } from '../../../../app.style';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBarComponent from '../../../../shared/components/TabBarComponent';
import { Icon } from '../../../../shared/components/Icon';

import { TabBarBottomProps } from 'react-navigation';
import { RootState } from '../../../../redux/store';
import { Dispatch } from 'redux';

import { Actions as usersActions } from '../../../../redux/users/AC';

import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import SearchNavigator from './SearchNavigator';

const Navigator = createBottomTabNavigator({
  HomeNavigator,
  SearchNavigator,
  NotificationNavigator: HomeNavigator,
  ProfileNavigator,
}, {
  initialRouteName: 'HomeNavigator',
  tabBarComponent: props => <TabBarComponent {...props}/>,

  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused}) => {
      const {routeName} = navigation.state;

      if (routeName === 'HomeNavigator') {
        return (
          <Icon
            name={`home${focused ? '-filled' : ''}`}
            size={22}
            color={focused ? mainColor : greyColorIcon}
          />
        );
      } else if (routeName === 'SearchNavigator') {
        return (
          <Icon
            name={`search${focused ? '-filled' : ''}`}
            size={22}
            color={focused ? mainColor : greyColorIcon}
          />
        );
      } else if (routeName === 'NotificationNavigator') {
        return (
          <Icon
            name={`notification${focused ? '-filled' : ''}`}
            size={21}
            color={focused ? mainColor : greyColorIcon}
          />
        );
      } else {
        return (
          <Icon
            name={`profile${focused ? '-filled' : ''}`}
            size={20}
            color={focused ? mainColor : greyColorIcon}
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
});

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