import {Colors, Text, View} from 'react-native-ui-lib';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import FastImage from 'react-native-fast-image';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import MainContainer from '@Containers/MainContainer';
import useMapView from './services';
import Configs from '@Configs/index';
import {COLORS} from '@Themes/Colors';
import {ITripDestination} from '@Types/index';
import {translate} from '@Languages/index';

const defaultLocation = {lat: 22, lng: 21};

export default function MapViewScreen(nav: any) {
  const {
    currentLocation,
    handleNotAvailableDirection,
    informationBottomSheetRef,
  } = useMapView(nav);
  const {location, place_id, name, mapsFullDetails}: ITripDestination =
    nav.route.params;

  const renderMarkerContent = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: Colors.primary,
            marginBottom: 8,
            borderRadius: 10,
            padding: 6,
            maxWidth: 140,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              textAlign: 'center',
            }}
            numberOfLines={3}>
            {name}
          </Text>
        </View>
        <View style={{width: 140, alignItems: 'center'}}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              borderWidth: 3,
              borderColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              overflow: 'hidden',
            }}>
            <FastImage
              resizeMode="contain"
              style={[
                {
                  width: 18,
                  height: 18,
                  borderRadius: 8,
                },
              ]}
              source={require('@Assets/Images/google.png')}
            />
          </View>
          <View
            style={{
              top: -4,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderStyle: 'solid',
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderBottomWidth: 20,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: Colors.primary,
              transform: [{rotate: '180deg'}],
            }}
          />
        </View>
      </>
    );
  };

  const renderInformationBottomSheet = () => {
    return (
      <BottomSheetModal
        ref={informationBottomSheetRef}
        snapPoints={['35%']}
        enablePanDownToClose>
        <View paddingH-12>
          <Text xxl medium center marginB-6>
            {name}
          </Text>
          {mapsFullDetails?.current_opening_hours?.weekday_text && (
            <Text medium xl marginH-8>
              {translate('destination.openHour')}
            </Text>
          )}
          {mapsFullDetails?.current_opening_hours?.weekday_text.map(
            (item: any) => {
              return (
                <Text regular marginH-8 marginV-4 key={item}>
                  {item}
                </Text>
              );
            },
          )}
        </View>
      </BottomSheetModal>
    );
  };

  return (
    <MainContainer showBackButton isFullScreen>
      <MapView
        onMarkerPress={event => {
          informationBottomSheetRef.current?.present();
        }}
        onPoiClick={({nativeEvent}) => {
          informationBottomSheetRef.current?.close();
        }}
        onPress={({nativeEvent}) => {
          informationBottomSheetRef.current?.close();
        }}
        showsUserLocation={true}
        initialRegion={{
          latitude: location?.lat ?? defaultLocation.lat,
          longitude: location?.lng ?? defaultLocation.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{width: '100%', height: '100%'}}
        loadingIndicatorColor={COLORS.primary}
        loadingEnabled
        loadingBackgroundColor={Colors.backgroundPrimary}>
        <Marker
          id={place_id}
          coordinate={{
            latitude: location?.lat ?? defaultLocation.lat,
            longitude: location?.lng ?? defaultLocation.lng,
          }}
          centerOffset={{x: 1, y: -46}}>
          {renderMarkerContent()}
        </Marker>
        <MapViewDirections
          origin={currentLocation?.coords}
          destination={{
            latitude: location?.lat ?? defaultLocation.lat,
            longitude: location?.lng ?? defaultLocation.lng,
          }}
          apikey={Configs.GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor={COLORS.blueLocation}
          optimizeWaypoints
          precision="high"
          timePrecision="now"
          onError={handleNotAvailableDirection}
        />
      </MapView>
      {renderInformationBottomSheet()}
    </MainContainer>
  );
}
