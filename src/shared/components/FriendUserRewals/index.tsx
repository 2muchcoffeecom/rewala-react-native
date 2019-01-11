import React from 'react';
import { connect } from 'react-redux';
import style from './style';
import { mainColor } from '../../../app.style';

import { ActivityIndicator, View } from 'react-native';
import RewalList from '../RewalList';

import { PagedOptions } from '../../../redux/request/states';
import { PagedQuestionOfUserInput } from '../../services/question.service';
import { RootState } from '../../../redux/store';
import { Dispatch } from 'redux';

import { Actions as questionssActions } from '../../../redux/questions/AC';

interface OwnProps {
  userId: string;
}

interface StateProps {
  pagedQuestionIds: string[];
  pagedQuestionOptions?: PagedOptions;
  isLoadingFirstPage?: boolean;
}

interface DispatchProps {
  getQuestionOfUser(input: PagedQuestionOfUserInput): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  pagedQuestionIds: state.questions.pagedQuestionsFromUserIds,
  pagedQuestionOptions: state.request.question.pagedOfUser.pagedOptions,
  isLoadingFirstPage: state.request.question.pagedOfUser.isLoadingFirstPage,
});

const mapDispatchToProps = (dispatch: Dispatch<questionssActions>): DispatchProps => (
  {
    getQuestionOfUser: (input) => {
      dispatch(questionssActions.getPagedQuestionsUser(input));
    },
  }
);

type Props = OwnProps & StateProps & DispatchProps;

class FriendUserRewals extends React.Component<Props> {

  componentDidMount() {
    this.props.getQuestionOfUser({
      id: this.props.userId,
      limit: 10,
    });
  }

  getNextPage = (next: string) => {
    this.props.getQuestionOfUser({
      id: this.props.userId,
      limit: 10,
      next,
    });
  }

  render() {
    const {pagedQuestionIds, pagedQuestionOptions, isLoadingFirstPage} = this.props;

    return (
      <View style={style.root}>
        {
          isLoadingFirstPage ?
            <ActivityIndicator
              animating={true}
              color={mainColor}
              size='large'
            /> :
            <RewalList
              getNextPage={this.getNextPage}
              questionIds={pagedQuestionIds}
              pagedRewalOptions={pagedQuestionOptions}
            />
        }
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FriendUserRewals);
