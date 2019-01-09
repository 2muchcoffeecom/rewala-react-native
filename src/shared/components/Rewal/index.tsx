import React from 'react';
import style from './style';

import { Text, View } from 'react-native';
import RewalHeader from '../RewalHeader';
import RewalBackground from '../RewalBackground';
import QuestionOptionsList from '../QuestionOptionsList';

import { QuestionOptionModel } from '../../models/questionOption.model';

interface OwnProps {
  fullName: string;
  hoursLeft: string;
  timeAgo: string;
  ownerId: string;
  authorizedUserId: string;
  title: string;
  titleColor: string;
  backgroundPath?: string;
  questionOptions: QuestionOptionModel[];
}

type Props = OwnProps;

class Rewal extends React.Component<Props> {

  render() {
    const {
      timeAgo, title, titleColor, backgroundPath, ownerId, hoursLeft, fullName, authorizedUserId, questionOptions,
    } = this.props;

    return (
      <View style={style.root}>
        <RewalHeader
          fullName={fullName}
          hoursLeft={hoursLeft}
          ownerId={ownerId}
          authorizedUserId={authorizedUserId}
        />
        <RewalBackground
          title={title}
          titleColor={titleColor}
          backgroundPath={backgroundPath}
        />
        <QuestionOptionsList
          questionOptions={questionOptions}
        />
        <Text
          style={style.timeAgo}
        >
          {`${timeAgo} min ago`}
        </Text>
      </View>
    );
  }
}

export default Rewal;
