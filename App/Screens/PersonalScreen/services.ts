import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useQuery} from 'react-query';

import ScreenNames from '@Constants/ScreenNames';
import {IRootState} from '@Store/Store';
import {resetUser, setUserInformation} from '@Store/Slices/UserSlice';
import {setLoading} from '@Store/Slices/LoadingSlice';
import useQueryFocus from '@Hooks/queryFocus';
import UserApi from '@Api/UserApi';
import {setAxiosDefaultToken} from '@Utils/index';

export default function usePersonal(nav: NativeStackScreenProps<any>) {
  const {navigation} = nav;
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IRootState) => state.user);

  const {refetch} = useQuery({
    queryKey: 'personalData',
    queryFn: async () => {
      const result = await UserApi.getUserInformation();
      dispatch(
        setUserInformation({
          ...currentUser,
          avatar: result.data?.avatar ?? currentUser.avatar,
        }),
      );
    },
  });

  const handleNavigateToWallet = () => {
    navigation.push(ScreenNames.MyWallet);
  };

  const handleNavigateToMyPost = () => {
    navigation.push(ScreenNames.PostedReview);
  };

  const handleNavigateToSetting = () => {
    navigation.push(ScreenNames.Setting);
  };

  const handleNavigateToAbout = () => {
    navigation.push(ScreenNames.About);
  };

  const handleNavigateToUpdate = () => {
    navigation.push(ScreenNames.UpdatePersonal);
  };

  const handleNavigateToSavedReview = () => {
    navigation.push(ScreenNames.SavedReview);
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setAxiosDefaultToken('');
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(resetUser());
      navigation.replace(ScreenNames.Login);
    }
  };

  useEffect(() => {
    console.log('change', currentUser.avatar);
  }, [currentUser.avatar]);

  useQueryFocus(refetch);

  return {
    handleLogout,
    currentUser,
    handleNavigateToUpdate,
    handleNavigateToWallet,
    handleNavigateToMyPost,
    handleNavigateToSetting,
    handleNavigateToAbout,
    handleNavigateToSavedReview,
  };
}
