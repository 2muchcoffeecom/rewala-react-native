import React from 'react';
import { connect } from 'react-redux';
import style from './style';
import { mainColor } from '../../../app.style';

import { ActivityIndicator, View } from 'react-native';
import RewalList from '../RewalList';

import { PagedOptions } from '../../../redux/request/states';
import { PagedQuestionInput } from '../../services/question.service';
import { RootState } from '../../../redux/store';
import { Dispatch } from 'redux';

import { Actions as questionssActions } from '../../../redux/questions/AC';

interface StateProps {
  pagedQuestionIds: string[];
  pagedQuestionOptions?: PagedOptions;
  isLoadingFirstPage?: boolean;
}

interface DispatchProps {
  getMyQuestions(input: PagedQuestionInput): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  pagedQuestionIds: state.questions.pagedQuestionsFromMeIds,
  pagedQuestionOptions: state.request.question.pagedMe.pagedOptions,
  isLoadingFirstPage: state.request.question.pagedMe.isLoadingFirstPage,
});

const mapDispatchToProps = (dispatch: Dispatch<questionssActions>): DispatchProps => (
  {
    getMyQuestions: (input) => {
      dispatch(questionssActions.getPagedQuestionsMe(input));
    },
  }
);

type Props = StateProps & DispatchProps;

class MyRewals extends React.PureComponent<Props> {

  componentDidMount() {
    this.props.getMyQuestions({
      limit: 10,
    });
  }

  getNextPage = (next: string) => {
    this.props.getMyQuestions({
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

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(MyRewals);
