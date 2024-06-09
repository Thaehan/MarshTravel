import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import MainContainer from '@Containers/MainContainer';
import useEditDestinationScreen from './services';
import {translate} from '@Languages/index';
import {ITripDestination} from '@Types/index';
import ShadowBox from '@Utils/ShadowBox';
import {COLORS} from '@Themes/Colors';
import {
  formatDistanceInMeters,
  formatTimeInSecondsToMinutes,
  getGoogleMapImageUrl,
} from '@Utils/index';
import CustomButton from '@Components/CustomButton';
import FloatingButton from '@Components/FloatingButton';

export default function EditDestinationScreen(
  nav: NativeStackScreenProps<any>,
) {
  const {
    currentDay,
    setCurrentDay,
    handleSave,
    handleOptimize,
    handleScroll,
    showButtonTitle,
    matrix,
    total,
  } = useEditDestinationScreen(nav);

  const renderEditingDestination = (
    data: RenderItemParams<ITripDestination>,
  ) => {
    const {drag, getIndex, isActive, item} = data;

    const photos =
      item?.mapsSearchDetails?.photos ?? item?.mapsFullDetails?.photos;
    const imageSource =
      photos && photos[0]
        ? {
            uri: getGoogleMapImageUrl(
              photos[0].photo_reference,
              photos[0].width,
            ),
          }
        : require('@Assets/Images/no-background.jpeg');

    const getCurrentItemInMatrix = () => {
      const index = getIndex();
      if (!index) {
        return {};
      }
      const current = matrix?.find(matrixItem => {
        return (
          matrixItem.origin_place_id === currentDay[index - 1].place_id &&
          matrixItem.destination_place_id === item.place_id
        );
      });
      return current;
    };

    const renderAbout = () => {
      const currentItemMatrix = getCurrentItemInMatrix();

      if (getIndex() === 0) {
        return (
          <Text regular md white>
            {translate('detailSchedule.startPoint')}
          </Text>
        );
      }

      return (
        <View row>
          <Text regular md white>{`${formatTimeInSecondsToMinutes(
            //@ts-expect-error
            currentItemMatrix?.duration,
            //@ts-expect-error
          )} - ${formatDistanceInMeters(currentItemMatrix?.distance)}`}</Text>
        </View>
      );
    };

    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          delayLongPress={100}
          spread
          marginH-12
          marginV-4
          bg-white
          style={[{borderRadius: 8}, ShadowBox.boxShadow]}
          flex>
          <FastImage
            style={{
              width: '100%',
              aspectRatio: 3.5,
              borderRadius: 10,
              position: 'relative',
            }}
            source={imageSource}>
            <LinearGradient
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.8}}
              colors={[
                COLORS.backgroundTripItem,
                COLORS.backgroundTripItem,
                `${COLORS.backgroundTripItem}90`,
                `${COLORS.backgroundTripItem}50`,
                `${COLORS.backgroundTripItem}10`,
                '#00000000',
              ]}
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}>
              <View height="100%" center>
                <SimpleLineIcons
                  name="menu"
                  size={22}
                  style={{padding: 12, paddingLeft: 0}}
                  color="white"
                />
              </View>
              <View style={{flex: 9}}>
                <Text medium lg white>
                  {item?.name}
                </Text>

                <Text regular md white>{`${translate(
                  'detailSchedule.firstPosition',
                )} ${item.position + 1}`}</Text>
                {renderAbout()}
              </View>
            </View>
          </FastImage>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const renderSubButon = () => {
    if (!currentDay.length) {
      return;
    }

    return (
      <FloatingButton
        title={translate('detailSchedule.optimize')}
        showTitle={showButtonTitle}
        onPress={handleOptimize}
        style={{
          bottom: 100,
        }}
        icon={
          <MaterialIcon
            name="lightbulb-outline"
            size={24}
            color={COLORS.backgroundMain}
            style={{}}
          />
        }
      />
    );
  };

  const renderSaveButton = () => {
    if (!currentDay.length) {
      return;
    }

    return (
      <CustomButton
        label={translate('detailSchedule.saveEdit')}
        textColor={COLORS.backgroundMain}
        containerStyle={[
          {
            paddingHorizontal: 8,
            backgroundColor: COLORS.primary,
            marginHorizontal: 12,
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 8,
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 0,
          },
          ShadowBox.boxShadow,
        ]}
        onPress={handleSave}
      />
    );
  };

  const renderTotal = () => {
    return (
      <View
        padding-12
        marginH-12
        marginV-4
        backgroundColor={COLORS.secondary}
        style={{borderRadius: 12}}>
        <Text medium md white>
          {translate('detailSchedule.totalTitle')}
        </Text>
        <Text
          giga
          semiBold
          white
          style={{lineHeight: 32}}>{`${formatTimeInSecondsToMinutes(
          total?.time,
        )}/${formatDistanceInMeters(total?.distance)}`}</Text>
      </View>
    );
  };

  return (
    <MainContainer
      showBackButton
      showHeader
      title={translate('detailSchedule.editingList')}
      subButton={renderSubButon()}>
      {renderTotal()}
      <NestableScrollContainer onScroll={handleScroll} nestedScrollEnabled>
        <NestableDraggableFlatList
          onScroll={handleScroll}
          data={currentDay ?? []}
          renderItem={renderEditingDestination}
          keyExtractor={(item, index) => `destination-item-${index}`}
          onDragEnd={({data}) => {
            setCurrentDay(data);
          }}
        />
      </NestableScrollContainer>
      {renderSaveButton()}
    </MainContainer>
  );
}
