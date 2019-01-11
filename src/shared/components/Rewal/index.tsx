import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { Text, View } from 'react-native';
import RewalHeader from '../RewalHeader';
import RewalBackground from '../RewalBackground';
import QuestionOptionsList from '../QuestionOptionsList';

import { QuestionOptionModel } from '../../models/questionOption.model';
import { ProfileModel } from '../../models/profile.model';
import { RootState } from '../../../redux/store';

import selectorsService from '../../services/selectors.service';

export interface OwnProps {
  _id: string;
  title: string;
  titleColor?: string;
  questionOptionIds: string[];
  ownerId: string;
  expiredTime: number;
  createdAt: string;
  backgroundPath?: string;
}

interface StateProps {
  authorizedUserId: string;
  ownerProfile?: ProfileModel;
  questionOptions: QuestionOptionModel[];
  // friendFollowRequest?: FollowRequest;
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  authorizedUserId: state.auth.authorizedUserId,
  ownerProfile: selectorsService.getProfileByUserIdFromRewalProps(state, props),
  questionOptions: selectorsService.getQuestionOptionsByQuestionIdsFromRewalProps(state, props),
});

type Props = OwnProps & StateProps;

class Rewal extends React.PureComponent<Props> {
  render() {
    const {
      title, titleColor, backgroundPath, ownerId, ownerProfile,
      authorizedUserId, questionOptions, expiredTime, createdAt,
    } = this.props;

    return (
      <View style={style.root}>
        <RewalHeader
          fullName={ownerProfile ? ownerProfile.fullName : ''}
          hoursLeft={createdAt}
          ownerId={ownerId}
          authorizedUserId={authorizedUserId}
          avatarThumbPath={ownerProfile && ownerProfile.avatarThumbPath}
          // friendFollowRequest={friendFollowRequest}
        />
        <RewalBackground
          title={title}
          titleColor={titleColor ? titleColor : ''}
          backgroundPath={backgroundPath}
        />
        <QuestionOptionsList
          questionOptions={questionOptions}
        />
        <Text style={style.timeAgo}>
          {`${expiredTime} min ago`}
        </Text>
      </View>
    );
  }
}

export default connect<StateProps>(mapStateToProps)(Rewal);