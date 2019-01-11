import React from 'react';
import { connect } from 'react-redux';
import style from './style';

import { View, FlatList, ListRenderItem } from 'react-native';
import Rewal, { OwnProps as IRewalListItem } from '../Rewal';
import NoRewals from '../NoRewals';

import { RootState } from '../../../redux/store';
import { QuestionModel } from '../../models/question.model';

import selectorsService from '../../../shared/services/selectors.service';
import { PagedOptions } from '../../../redux/request/states';

export interface OwnProps {
  questionIds: string[];
  pagedRewalOptions?: PagedOptions;
  getNextPage(next: string): void;
}

interface StateProps {
  pagedQuestions: QuestionModel[];
}

const mapStateToProps = (state: RootState, props: Props): StateProps => ({
  pagedQuestions: selectorsService.getPagedQuestionByIdsFromRewalProps(state, props),
});

type Props = OwnProps & StateProps;

class RewalList extends React.PureComponent<Props> {

  onEndReached = () => {
    const {pagedRewalOptions, getNextPage} = this.props;

    if (pagedRewalOptions && pagedRewalOptions.hasNext && pagedRewalOptions.next) {
      getNextPage(pagedRewalOptions.next);
    }
  }

  listEmptyComponent = (isVisible: boolean) => {
    return (
      isVisible ?
        <NoRewals/> :
        null
    );
  }

  private keyExtractor = (item: IRewalListItem) => `${item._id}`;

  private renderItem: ListRenderItem<IRewalListItem> = ({item}) => {

    return (
      <Rewal
        _id={item._id}
        title={item.title}
        titleColor={item.titleColor}
        ownerId={item.ownerId}
        createdAt={item.createdAt}
        expiredTime={item.expiredTime}
        backgroundPath={item.backgroundPath}
        questionOptionIds={item.questionOptionIds}
      />
    );
  }

  render() {

    return (
      <View style={style.root}>
        <FlatList
          data={this.props.pagedQuestions}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={this.onEndReached}
          initialNumToRender={10}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={this.listEmptyComponent(this.props.questionIds.length === 0)}
        />
      </View>
    );
  }
}

export default connect<StateProps>(mapStateToProps)(RewalList);
