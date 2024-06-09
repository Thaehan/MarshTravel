import {Carousel, Colors, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import MainContainer from '@Containers/MainContainer';
import useDetailSchedule from './services';
import TripDaySelector from '@Screens/DetailScheduleScreen/items/TripDaySelector';
import TripDayItem from '@Screens/DetailScheduleScreen/items/TripDayItem';
import MainLoading from '@Components/MainLoading';
import SearchScreen from '@Screens/SearchScreen';
import FloatingButton from '@Components/FloatingButton';
import {translate} from '@Languages/index';
import {COLORS} from '@Themes/Colors';
import {fontFamilies} from '@Themes/Fonts';
import ScreenNames from '@Constants/ScreenNames';

export default function DetailScheduleScreen(nav: NativeStackScreenProps<any>) {
  const {route} = nav;
  const {
    data,
    isFetching,
    nextTripDay,
    previousTripDay,
    currentTripDayIndex,
    setCurrentTripDayIndex,
    carouselRef,
    handleSettingButton,
    startAt,
    addDestinationRef,
    showButtonTitle,
    handleScroll,
    handleEditDestination,
  } = useDetailSchedule(nav);

  const renderSubButton = () => {
    return (
      <FloatingButton
        title={translate('detailSchedule.sortButton')}
        showTitle={showButtonTitle}
        onPress={handleEditDestination}
        style={{
          bottom: 100,
        }}
        icon={
          <MaterialIcon
            name="sort"
            size={24}
            color={COLORS.backgroundMain}
            style={{fontFamily: fontFamilies.primaryRegular}}
          />
        }
      />
    );
  };

  const renderSettingButton = () => {
    return (
      <TouchableOpacity paddingH-2 paddingV-8 onPress={handleSettingButton}>
        <SimpleLineIcons size={22} color={Colors.black1} name="settings" />
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (isFetching) {
      return <MainLoading />;
    }

    if (!data?.days) {
      return null;
    }

    return (
      <>
        <TripDaySelector
          startAt={startAt}
          tripDayIndex={currentTripDayIndex}
          onPressLeft={previousTripDay}
          onPressRight={nextTripDay}
        />
        <Carousel
          initialPage={currentTripDayIndex}
          onChangePage={(pageIndex: number) =>
            setCurrentTripDayIndex(pageIndex)
          }
          ref={carouselRef}>
          {data.days.map((tripday, tripdayIndex) => {
            const currentTripDay = {...tripday, tripId: route.params?.id};
            return (
              <TripDayItem
                data={currentTripDay}
                key={tripday.id}
                isPresent={currentTripDayIndex === tripdayIndex}
                onScroll={handleScroll}
              />
            );
          })}
        </Carousel>
      </>
    );
  };

  return (
    <MainContainer
      subButton={renderSubButton()}
      showBackButton
      showHeader
      title={data?.name ?? route.params?.name}
      left={renderSettingButton()}>
      {renderContent()}
      <BottomSheetModal
        backdropComponent={(props: any) => {
          return (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              opacity={0.4}
            />
          );
        }}
        ref={addDestinationRef}
        snapPoints={['90%']}
        stackBehavior="push">
        <SearchScreen isAdd />
      </BottomSheetModal>
      {/**Tách */}
    </MainContainer>
  );
}
