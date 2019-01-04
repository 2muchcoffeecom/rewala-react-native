import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import style from './style';
import { greyColorIcon } from '../../../app.style';
import { Icon } from '../Icon';

export interface OwnProps {
  searchQuery: string;
  changeSearchQuery(value: string): void;
  searchRequest?: (value: string) => void;
}

type Props = OwnProps;

export const SearchInput: React.FunctionComponent<Props> = (props: Props) => {
  const {searchQuery, changeSearchQuery, searchRequest} = props;

  const onChangeSearchValue = (value: string) => {
    searchRequest && searchRequest(value);

    changeSearchQuery(value)
  };

  const onPressSearchDeleteButton = () => {
    changeSearchQuery('');
  };

  return (
    <View style={style.root}>
      {
        searchQuery === '' ?
          <Icon
            name='search'
            size={18}
            color={greyColorIcon}
            style={style.searchImage}
          /> :
          <TouchableOpacity
            onPress={onPressSearchDeleteButton}
            style={style.searchDeleteButton}
          >
            <Icon
              name='delete-option'
              size={10}
              color={greyColorIcon}
            />
          </TouchableOpacity>
      }
      <TextInput
        style={style.searchInput}
        placeholderTextColor='#BCBCBF'
        placeholder='Search'
        onChangeText={onChangeSearchValue}
        value={searchQuery}
        maxLength={50}
      />
    </View>
  );
};

export default React.memo(SearchInput);