import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Asset} from 'react-native-image-picker';

import {translate} from '@Languages/index';
import ShowMessage from '@Utils/Message';
import {IRootState} from '@Store/Store';
import UserApi from '@Api/UserApi';
import {setUserInformation} from '@Store/Slices/UserSlice';
import {setLoading} from '@Store/Slices/LoadingSlice';
import {IUserInformation} from '@Types/index';

export default function useUpdatePersonal(nav: NativeStackScreenProps<any>) {
  const {navigation} = nav;
  const currentUser = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>();
  const [avatar, setAvatar] = useState<string>(currentUser.avatar);
  const [username, setUsername] = useState<string>(currentUser.username);
  const [otp, setOtp] = useState<string>('');
  const [name, setName] = useState<string>(currentUser.name);
  const [date, setDate] = useState<Date | undefined>(
    currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : undefined,
  );

  const handleSetBlob = async (data: Asset) => {
    try {
      const tempFileName = data.fileName;
      const fileExtension = tempFileName?.split('.').pop();

      const tempFormData = new FormData();

      tempFormData.append('avatar', {
        uri: data.uri,
        type: `image/${fileExtension}`,
        name: data.fileName,
      });

      setFormData(tempFormData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    dispatch(setLoading(true));
    try {
      if (!name || !date || !username) {
        ShowMessage(`${translate('register.missingField')}`, 'danger');
        return;
      }
      const updatedInformation: IUserInformation = {
        ...currentUser,
        name,
        dateOfBirth: date.toISOString(),
        username,
      };

      const informationResult = await UserApi.updateUserInformation(
        updatedInformation,
      );

      if (!formData) {
        const newInformation = await UserApi.getUserInformation();
        console.log(newInformation);
        if (newInformation.data) {
          dispatch(setUserInformation(newInformation.data));
        }
      }

      if (formData) {
        //Có thể lỗi ở đây
        const avatarResult = await UserApi.updateAvatar(formData);

        if (avatarResult.data) {
          const newInformation = await UserApi.getUserInformation();
          console.log(newInformation);
          if (newInformation.data) {
            dispatch(setUserInformation(newInformation.data));
          }
        }
      }

      if (informationResult) {
        ShowMessage(`${translate('nav.updateSuccess')}`, 'success');
        navigation.pop();
      }
    } catch (error) {
      console.log(error);
      ShowMessage(`${translate('util.errorNetwork')}`, 'danger');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    avatar,
    setAvatar,
    username,
    setUsername,
    otp,
    setOtp,
    name,
    setName,
    date,
    setDate,
    handleUpdate,
    currentUser,
    handleSetBlob,
  };
}
