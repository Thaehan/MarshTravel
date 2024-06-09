import {
  View,
  Text,
  TouchableOpacity,
  Colors,
  Carousel,
} from 'react-native-ui-lib';
import React, {Ref} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import styles from './styles';
import useAddDestinationScreen from './services';
import MainLoading from '@Components/MainLoading';
import {IDestination} from '@Types/index';
import {COLORS} from '@Themes/Colors';
import TripAddItem from './TripAddItem';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TripDayAddItem from './TripDayAddItem';
import moment from 'moment';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

export default function AddDestinationScreen({
  destination,
  selectTripRef,
}: {
  destination: IDestination;
  selectTripRef: Ref<BottomSheetModal>;
}) {
  const {
    listTrip,
    listTripDay,
    isLoadingListTrip,
    isLoadingListTripDay,
    selectedTrip,
    refetchTrip,
    isRefetchingTrip,
    isFetchingNextPageTrip,
    carouselRef,
    setSelectedTrip,
    onPressTripItem,
    onPressPrev,
    onPressTripDayItem,
  } = useAddDestinationScreen({
    destination,
    selectTripRef,
  });

  const renderListTripDay = () => {
    if (isLoadingListTripDay) {
      return <MainLoading />;
    }

    return (
      <FlatList
        data={listTripDay}
        keyExtractor={(item, index) => `tripDataItem${index}`}
        renderItem={({item}) => {
          return (
            <TripDayAddItem
              data={item}
              onPressTripDayItem={onPressTripDayItem}
              startAt={selectedTrip?.startAt ?? moment().toISOString()}
            />
          );
        }}
      />
    );
  };

  const renderListTrip = () => {
    if (isLoadingListTrip) {
      return <MainLoading />;
    }

    return (
      <FlatList
        data={listTrip}
        keyExtractor={(item, index) => `tripDataItem${index}`}
        renderItem={({item}) => {
          return <TripAddItem data={item} onPressTrip={onPressTripItem} />;
        }}
      />
    );
  };

  return (
    <View>
      <Carousel ref={carouselRef}>
        {/**Tab 1 */}
        <View flexG marginH-12 marginT-4 centerV>
          {/**Header */}
          <Text lg medium marginB-8>{`${translate('destination.addTitle1')}\n"${
            destination.name
          }"`}</Text>
          {/**Body */}
          {renderListTrip()}
        </View>
        {/**Tab 2 */}
        <View flexG marginH-12 marginT-4>
          {/**Header */}
          <View row centerV marginB-8>
            <TouchableOpacity onPress={onPressPrev} padding-4>
              <MaterialCommunityIcons
                name="arrow-left"
                size={26}
                color={Colors.grey30}
              />
            </TouchableOpacity>
            <Text lg medium>{`${translate('destination.addTitle2')}`}</Text>
          </View>
          {/**Body */}
          {renderListTripDay()}
        </View>
      </Carousel>
    </View>
  );
}
