import React from 'react';
import style from './style';
import { QuestionOptionsColor } from '../../../app.style';

import { View } from 'react-native';
import QuestionVoteButton from '../QuestionVoteButton';

import { QuestionOptionModel } from '../../models/questionOption.model';

interface OwnProps {
  questionOptions: QuestionOptionModel[];
}

type Props = OwnProps;

const QuestionOptionsList: React.FunctionComponent<Props> = (props) => {
  const {questionOptions} = props;

  return (
    <View style={style.root}>
      {
        questionOptions.map((questionOption, index) => {
            return (
              <QuestionVoteButton
                title={questionOption.text}
                color={QuestionOptionsColor[`Option${index + 1}`]}
                questionOptionId={questionOption._id}
                key={questionOption._id}
              />
            );
          },
        )
      }
    </View>
  );
};

export default React.memo(QuestionOptionsList);
