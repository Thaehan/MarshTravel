import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import {useQuery} from 'react-query';

import ScreenNames from '@Constants/ScreenNames';
import {IDestination, IProvinceCategoryList} from '@Types/index';
import useLocation from '@Hooks/locations';
import {IRootState} from '@Store/Store';
import Configs from '@Configs/index';
import {setLocation} from '@Store/Slices/SystemSlice';
import {setAxiosDefaultToken} from '@Utils/index';
import ProvinceApi from '@Api/ProvinceApi';
import useHomeModal from '@Hooks/Modals/useHomeModal';

export default function useHome(nav: NativeStackScreenProps<any>) {
  const {navigation} = nav;
  const dispatch = useDispatch();
  const {close, present, ref} = useHomeModal();
  const carouselRef = useRef<any>();
  const accessToken = useSelector(
    (state: IRootState) => state.user.accessToken,
  );
  const currentLocation = useSelector(
    (state: IRootState) => state.system.location,
  );
  const {requestPermissions, getCurrentLocation, isPermissionGranted} =
    useLocation();

  const [showBlock, setShowBlock] = useState<boolean>(false);
  const [recommendIndex, setRecommendIndex] = useState<number>(0);
  const [currentList, setCurrentList] = useState<IProvinceCategoryList>();
  const [listPopular, setListPopular] = useState<IDestination[]>([]);

  const {isLoading, data, refetch, isRefetching} = useQuery({
    queryKey: ['homeDestination', currentLocation?.coords],
    queryFn: async () => {
      try {
        if (showBlock) {
          return;
        }

        const result = await ProvinceApi.getDesinationsByCurrentLocation({
          lat: currentLocation?.coords.latitude ?? 21.028511,
          lng: currentLocation?.coords.longitude ?? 105.804817,
        });

        if (result.data?.listRating) {
          setListPopular(result.data?.listRating);
        }

        return result.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleLogout = () => {
    navigation.replace(ScreenNames.Login);
  };

  const getLocation = async () => {
    try {
      const granted = await isPermissionGranted();
      console.log('granted', granted);
      if (granted !== 'granted') {
        setShowBlock(true);
        return;
      }
      await getCurrentLocation();
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const getLocationName = async () => {
    try {
      if (!currentLocation?.coords) {
        console.log('none');
        return;
      }

      const locationNameUrl =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        currentLocation.coords.latitude +
        ',' +
        currentLocation.coords.longitude +
        '&key=' +
        Configs.GOOGLE_API_KEY;

      const locationRes = await axios.get(locationNameUrl);

      const locationDataRes = locationRes.data;

      let address = '';
      let count = 0;
      if (locationDataRes.results[1]) {
        locationDataRes.results[1].address_components.map((addressCom: any) => {
          if (count == 3) {
            return;
          }
          if (addressCom.types.includes('political')) {
            if (address.length == 0) {
              address += addressCom.long_name;
            } else {
              address += `, ${addressCom.long_name}`;
            }
            count++;
          }
        });

        dispatch(
          setLocation({
            ...currentLocation,
            locationName: address.substring(0),
          }),
        );
      }
      if (locationDataRes.results[0]) {
        locationDataRes.results[0].address_components.map((addressCom: any) => {
          if (count == 3) {
            return;
          }
          if (addressCom.types.includes('political')) {
            if (address.length == 0) {
              address += addressCom.long_name;
            } else {
              address += `, ${addressCom.long_name}`;
            }
            count++;
          }
        });

        dispatch(
          setLocation({
            ...currentLocation,
            locationName: address.substring(0),
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocationName();
  }, [currentLocation?.coords]);

  useEffect(() => {
    setAxiosDefaultToken(accessToken);
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  return {
    handleLogout,
    listPopular,
    setListPopular,
    carouselRef,
    recommendIndex,
    setRecommendIndex,
    currentLocation,
    isLoading,
    data,
    refetch,
    isRefetching,
    currentList,
    setCurrentList,
    showBlock,
    setShowBlock,
    present,
    close,
    ref,
  };
}
