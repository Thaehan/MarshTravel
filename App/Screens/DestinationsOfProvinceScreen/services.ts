import {useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {useQuery} from 'react-query';

import {IRootState} from '@Store/Store';
import ProvinceApi from '@Api/ProvinceApi';
import useLocation from '@Hooks/locations';
import {IProvinceCategoryList} from '@Types/index';
import ShowMessage from '@Utils/Message';
import {translate} from '@Languages/index';
import Carousel from 'react-native-snap-carousel';

export default function useDestinationsOfProvinceScreen({
  isHome,
}: {
  isHome?: boolean;
}) {
  const sliderRef = useRef<Carousel<any>>(null);
  const carouselRef = useRef<any>(null);
  const {getCurrentLocation, requestPermissions} = useLocation();
  const {pickedProvinceId, pickedAddInformation, refetchProvinceList} =
    useSelector((state: IRootState) => state.feature);
  const location = useSelector((state: IRootState) => state.system.location);

  const {isLoading, data, refetch, isRefetching} = useQuery({
    queryKey: ['destinationsOfProvince', pickedProvinceId],
    queryFn: async () => {
      try {
        if (isHome && location) {
          await requestPermissions();
          await getCurrentLocation();

          const {longitude, latitude} = location.coords;

          const result = await ProvinceApi.getDesinationsByCurrentLocation({
            lat: latitude,
            lng: longitude,
          });

          if (result.data?.followed) {
            setFollowing(true);
          }
          return result.data;
        }

        const result = await ProvinceApi.getDestinationsByProvince(
          pickedProvinceId,
        );

        if (result.data?.followed) {
          setFollowing(true);
        }
        return result.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>();
  const [following, setFollowing] = useState<boolean>(data?.followed ?? false);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [currentList, setCurrentList] = useState<IProvinceCategoryList>();
  const [recommendIndex, setRecommendIndex] = useState<number>(0);

  const handleFollowProvince = async () => {
    setFollowing(!following);
    try {
      console.log(data?.code, following);
      const result = await ProvinceApi.setFollowProvince({
        code: data?.code ?? '01',
        follow: !following,
      });
      console.log('result', result);
      ShowMessage(
        following
          ? translate('province.unfollowSuccess')
          : translate('province.followSuccess'),
        'success',
      );
    } catch (error) {
      console.error(error);
    } finally {
      if (refetchProvinceList) {
        refetchProvinceList();
      }
    }
  };

  useEffect(() => {
    carouselRef.current?.goToPage(currentPageIndex, true);
  }, [currentPageIndex]);

  return {
    pickedProvinceId,
    pickedAddInformation,
    searchText,
    setSearchText,
    isLoading,
    data,
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    handleFollowProvince,
    following,
    carouselRef,
    currentPageIndex,
    setCurrentPageIndex,
    currentList,
    setCurrentList,
    isRefetching,
    recommendIndex,
    setRecommendIndex,
    sliderRef,
  };
}
