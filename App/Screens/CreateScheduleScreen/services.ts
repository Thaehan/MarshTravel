import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createRef, useEffect, useState} from 'react';

import {translate} from '@Languages/index';
import ShowMessage from '@Utils/Message';
import {useSpringAnimation} from '@Hooks/animations';
import {ISelectItem} from '@Types/index';
import TripApi from '@Api/TripApi';
import {useQuery} from 'react-query';
import useQueryFocus from '@Hooks/queryFocus';
import ProvinceApi from '@Api/ProvinceApi';
import {useSelector} from 'react-redux';
import {IRootState} from '@Store/Store';

export default function useCreateSchedule(nav: NativeStackScreenProps<any>) {
  const {navigation} = nav;
  const carouselRef = createRef<any>();
  const {animationStyle, handleHide, handleShow} = useSpringAnimation(
    -200,
    'horizontal',
  );
  const currentLanguage = useSelector(
    (state: IRootState) => state.system.language,
  );

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>();
  const [dayLong, setDayLong] = useState<number>();
  const [province, setProvince] = useState<ISelectItem<string>>();
  const [description, setDescription] = useState<string>('');

  const {data, isLoading, isFetching, refetch} = useQuery({
    queryKey: ['allListOfProvinces'],
    queryFn: async () => {
      const result = await ProvinceApi.getProvinceList();

      if (!result.data) {
        return [];
      }

      const listProvince: ISelectItem<string>[] = result.data.map(item => {
        return {
          label: currentLanguage === 'vi' ? item.name : item.name_en,
          value: item.code,
        };
      });

      return listProvince;
    },
  });

  const handleNextStep1 = () => {
    if (!name || !name.length) {
      ShowMessage(`${translate('createSchedule.missingField')}`, 'danger');
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleNextStep2 = () => {
    if (!startDate) {
      ShowMessage(`${translate('createSchedule.missingField')}`, 'danger');
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleNextStep3 = () => {
    if (!dayLong) {
      ShowMessage(`${translate('createSchedule.missingField')}`, 'danger');
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleNextStep4 = () => {
    if (!province || !province?.value || !province?.value?.length) {
      ShowMessage(`${translate('createSchedule.missingField')}`, 'danger');
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleNextStep5 = async () => {
    try {
      if (name && startDate && dayLong && province) {
        const result = await TripApi.createTrip({
          name,
          startAt: startDate.toISOString(),
          tripLength: dayLong,
          initialStartOffsetFromMidnight: 5000,
          description,
        });

        if (result) {
          ShowMessage(`${translate('createSchedule.done')}`, 'success');
        }
      }
    } catch (error) {
      ShowMessage(`${translate('util.errorNetwork')}`, 'danger');
    } finally {
      navigation.goBack();
    }
  };

  const handlePrevStep = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    carouselRef.current.goToPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!dayLong) {
      handleHide();
    } else {
      handleShow();
    }
  }, [dayLong]);

  useQueryFocus(refetch);

  return {
    carouselRef,
    currentPage,
    setCurrentPage,
    name,
    setName,
    handleNextStep1,
    startDate,
    setStartDate,
    handleNextStep2,
    dayLong,
    setDayLong,
    handleNextStep3,
    animationStyle,
    handlePrevStep,
    data,
    province,
    setProvince,
    handleNextStep4,
    description,
    setDescription,
    handleNextStep5,
  };
}
