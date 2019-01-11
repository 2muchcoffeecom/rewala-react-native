import React from 'react';
import style from './style';
import { connect } from 'react-redux';
import { blackColor } from '../../../app.style';

import { Text, View } from 'react-native';
import { Icon } from '../../../shared/components/Icon';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';

import { Dispatch } from 'redux';
import { FollowRequestStatus } from '../../models/followRequest.model';
import { UpdateFollowRequestInput } from '../../services/friend.service';
import { Actions as friendsActions } from '../../../redux/friends/AC';

interface OwnProps {
  ownerId: string;
  authorizedUserId: string;
}

interface DispatchProps {
  updateFriend(data: UpdateFollowRequestInput): void;
}

const mapDispatchToProps = (dispatch: Dispatch<friendsActions>): DispatchProps => (
  {
    updateFriend: (data) => {
      dispatch(friendsActions.updateFriend(data));
    },
  }
);

type Props = OwnProps & DispatchProps;

class RewalHeaderMenu extends React.PureComponent<Props> {

  onPressDeleteFriend = () => {
    this.props.updateFriend({
      status: FollowRequestStatus.DECLINED,
      _id: this.props.ownerId,
    });
  }

  onPressDeleteRewal = () => {
    // TODO: no back end
  }

  customMenu = (props: any) => {
    const {children, layouts, ...other} = props;
    // @ts-ignore
    const {computePosition} = renderers.ContextMenu;
    const position = {top: computePosition(layouts).top + 17, left: computePosition(layouts).left - 12};

    return (
      <View {...other} style={[props.style, position]}>
        {children}
      </View>
    );
  }

  render() {
    const {ownerId, authorizedUserId} = this.props;

    return (
      <View style={style.root}>
      <Menu renderer={this.customMenu}>
        <MenuTrigger
          children={
            <Icon
              name='more'
              size={17}
              color={blackColor}
              style={style.popupButton}
            />
          }
        />
        <MenuOptions customStyles={{optionsContainer: style.optionsContainer}}>
          {
            ownerId === authorizedUserId ?
              <MenuOption onSelect={this.onPressDeleteRewal}>
                <Text style={style.text}>Delete Rewal</Text>
              </MenuOption> :
              <MenuOption
                onSelect={this.onPressDeleteFriend}
                customStyles={{
                  optionWrapper: style.optionWrapper,
                }}
              >
                <Text style={style.text}>Delete Friend</Text>
              </MenuOption>
          }
        </MenuOptions>
      </Menu>
      </View>
    );
  }
}

export default connect<null, DispatchProps>(null, mapDispatchToProps)(RewalHeaderMenu);
