import {Text, View} from 'react-native-ui-lib';
import React, {useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RefreshControl, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainContainer from '@Containers/MainContainer';
import AnimationScreenContainer from '@Containers/AnimationScreenContainer';
import {translate} from '@Languages/index';
import styles from './styles';
import useListTrip from './services';
import {ITrip} from '@Types/index';
import FloatingButton from '@Components/FloatingButton';
import TripItem from '@Components/TripItem';
import MainLoading from '@Components/MainLoading';
import EmptyPage from '@Components/EmptyPage';
import {COLORS} from '@Themes/Colors';
import TripDayMenuOptionsItem, {
  ITripDayMenuOptionItem,
} from '@Screens/DetailScheduleScreen/items/TripDayItem/TripDayMenuOptionsItem';

export default function ListTripScreen(nav: NativeStackScreenProps<any>) {
  const {
    handleScroll,
    showButtonTitle,
    handleNavigateToAddScreen,
    isFetchingNextPage,
    isRefetching,
    refetch,
    data,
    isLoading,
    settingModalRef,
    modalVisible,
    setModalVisible,
    handleDeleteTrip,
    handleArchiveTrip,
    selectedTripId,
    setSelectedTripId,
  } = useListTrip(nav);

  const listOptions: Array<ITripDayMenuOptionItem> = useMemo(() => {
    return [
      {
        //Option
        title: translate('scheduleList.archiveTrip'),
        icon: (
          <MaterialCommunityIcons
            name="archive"
            color={COLORS.secondary}
            size={30}
          />
        ),
        onPress: handleArchiveTrip,
      },
      {
        //Option
        title: translate('scheduleList.deleteTrip'),
        icon: (
          <MaterialCommunityIcons
            name="delete"
            color={COLORS.secondary}
            size={30}
          />
        ),
        onPress: handleDeleteTrip,
      },
    ];
  }, [selectedTripId]);

  const renderTripItem = ({item}: {item: ITrip}) => {
    return (
      <TripItem
        data={item}
        nav={nav}
        settingAction={() => {
          setModalVisible(true);
          setSelectedTripId(item.id);
        }}
      />
    );
  };

  const renderSubButton = () => {
    return (
      <FloatingButton
        title={translate('scheduleList.createButton')}
        showTitle={showButtonTitle}
        onPress={handleNavigateToAddScreen}
      />
    );
  };

  const renderLoading = () => {
    if (isFetchingNextPage) {
      return <MainLoading />;
    }
  };

  const renderHeader = () => {
    return (
      <Text marginL-12 giga medium>
        {translate('nav.schedule')}
      </Text>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <MainLoading />;
    }

    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        data={data}
        renderItem={renderTripItem}
        style={styles.list}
        onScroll={handleScroll}
        keyExtractor={(item, index) => `TripItem-${index}`}
        ListFooterComponent={renderLoading}
        ListEmptyComponent={EmptyPage}
      />
    );
  };

  return (
    <MainContainer
      subButton={renderSubButton()}
      title={renderHeader()}
      showHeader>
      <AnimationScreenContainer disableScroll>
        {renderContent()}
      </AnimationScreenContainer>
      <Modal
        backdropOpacity={0.5}
        isVisible={modalVisible}
        useNativeDriver
        ref={settingModalRef}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        style={{margin: 0, padding: 0}}>
        <View
          style={{
            backgroundColor: COLORS.backgroundMain,
            alignSelf: 'center',
            paddingVertical: 12,
            paddingHorizontal: 8,
            borderRadius: 12,
          }}>
          {listOptions.map(item => {
            return <TripDayMenuOptionsItem data={item} key={item.title} />;
          })}
        </View>
      </Modal>
    </MainContainer>
  );
}
