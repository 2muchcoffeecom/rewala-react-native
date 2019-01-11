import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, ActivityIndicator } from 'react-native';
import AddRewalButton from '../../../../../../shared/components/AddRewalButton';
import RewalList from '../../../../../../shared/components/RewalList';

import { Dispatch } from 'redux';
import { PagedOptions } from '../../../../../../redux/request/states';
import { RootState } from '../../../../../../redux/store';
import { PagedQuestionInput } from '../../../../../../shared/services/question.service';

import { Actions as questionssActions } from '../../../../../../redux/questions/AC';
import { mainColor } from '../../../../../../app.style';

interface StateProps {
  pagedQuestionIds: string[];
  pagedQuestionOptions?: PagedOptions;
  isLoadingFirstPage?: boolean;
}

interface DispatchProps {
  getQuestionFeed(input: PagedQuestionInput): void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  pagedQuestionIds: state.questions.pagedQuestionsFromFeedIds,
  pagedQuestionOptions: state.request.question.pagedFeed.pagedOptions,
  isLoadingFirstPage: state.request.question.pagedFeed.isLoadingFirstPage,
});

const mapDispatchToProps = (dispatch: Dispatch<questionssActions>): DispatchProps => (
  {
    getQuestionFeed: (input) => {
      dispatch(questionssActions.getPagedQuestionsFeed(input));
    },
  }
);

type Props = StateProps & DispatchProps;

class HomeScreen extends React.PureComponent<Props> {

  componentDidMount() {
    this.props.getQuestionFeed({
      limit: 10,
    });
  }

  getNextPage = (next: string) => {
    this.props.getQuestionFeed({
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
        <AddRewalButton/>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(HomeScreen);
