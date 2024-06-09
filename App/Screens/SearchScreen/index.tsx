import {View, Text} from 'react-native-ui-lib';
import React from 'react';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {translate} from '@Languages/index';
import useSearchScreen from './services';
import PopularDestinationItem from '@Components/PopularDestinationItem';
import EmptyPage from '@Components/EmptyPage';
import TextField from '@Components/TextField';
import {COLORS} from '@Themes/Colors';
import MainLoading from '@Components/MainLoading';

export default function SearchScreen({isAdd}: {isAdd?: boolean}) {
  const {
    searchText,
    setSearchText,
    data,
    isLoading,
    isRefetching,
    refetch,
    isFetching,
    searchTimeoutRef,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchScreen();

  const renderHeader = () => {
    return (
      <View>
        <Text giga medium>
          {isAdd
            ? translate('explore.addDestination')
            : translate('explore.searchButton')}
        </Text>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <TextField
        fontSize="lg"
        value={searchText}
        onChangeValue={setSearchText}
        placeholder={translate('explore.searchingPH')}
        rightIcon={<MaterialIcons name={'search'} size={30} />}
        containerStyle={{
          backgroundColor: COLORS.backgroundSecondary,
          paddingHorizontal: 16,
          borderRadius: 30,
        }}
      />
    );
  };

  const renderContent = () => {
    if (!searchText.length) {
      return (
        <Text center marginV-12 regular lg>
          {translate('explore.noSearchText')}
        </Text>
      );
    }

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isLoading}
            onRefresh={refetch}
          />
        }
        data={data}
        renderItem={({item}) => {
          return <PopularDestinationItem data={item} type="search" />;
        }}
        ListFooterComponent={isFetchingNextPage ? <MainLoading /> : null}
        ListEmptyComponent={() => {
          if (isFetching) {
            return <MainLoading />;
          }
          return <EmptyPage />;
        }}
        // onEndReached={() => {
        //   if (hasNextPage) {
        //     fetchNextPage();
        //   }
        // }}
        contentContainerStyle={{flexGrow: 1}}
      />
    );
  };

  return (
    <View marginH-12 flex>
      {renderHeader()}
      {renderSearchBar()}
      {renderContent()}
    </View>
  );
}
