import {useDispatch, useSelector} from 'react-redux';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {IRootState} from '@Store/Store';
import {setLoading} from '@Store/Slices/LoadingSlice';
import ShowMessage from '@Utils/Message';
import ReviewApi from '@Api/ReviewApi';
import {translate} from '@Languages/index';

interface ICreateReviewData {
  title: string;
  description: string;
  place_id: string;
  rating: number;
}

export default function useCreatedReviewScreen(
  nav: NativeStackScreenProps<any>,
) {
  const params = nav.route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [imageData, setImageData] = useState<Image[]>([]);
  const [textData, setTextData] = useState<ICreateReviewData>({
    title: '',
    description: '',
    place_id: params?.id || 'ChIJVVVlXrqsNTERfVP1HjnNcH0',
    rating: 3,
  });

  const getCompleteFormData = () => {
    const tempFormData = new FormData();

    Object.entries(textData).forEach(([key, value]) => {
      tempFormData.append(key, value);
    });

    imageData.forEach(image => {
      const fileExtension = image.path.split('.').pop();
      const fileName = image.path.split('/').pop()?.split('.').at(0);

      tempFormData.append('images', {
        uri: image.path,
        type: `image/${fileExtension}`,
        name: fileName,
      });
    });

    return tempFormData;
  };

  const handlePickImage = async () => {
    try {
      const result = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      if (result) {
        setImageData(result);
      }
    } catch (error) {}
  };

  const handlePostReview = async () => {
    dispatch(setLoading(true));
    try {
      const isNotValidLength = Object.entries(textData).some(([key, value]) => {
        if (
          (key === 'title' && value.toString().length < 16) ||
          (key === 'description' && value.toString().length < 16) ||
          !imageData.length
        ) {
          return true;
        }
        return value === 0 || value.toString().length === 0;
      });

      if (isNotValidLength) {
        ShowMessage(translate('util.missingField'), 'warning');
        return;
      }

      const completeFormData = getCompleteFormData();
      const result = await ReviewApi.createReview(completeFormData);

      if (result) {
        ShowMessage(translate('review.successCreateReview'), 'success');
        navigation.goBack();
      }
    } catch (error) {
      console.log('error', error);
      ShowMessage(translate('util.errorNetwork'), 'danger');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handlePickImage,
    handlePostReview,
    textData,
    setTextData,
    imageData,
    setImageData,
  };
}
