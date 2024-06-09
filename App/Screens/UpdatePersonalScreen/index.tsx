import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import useUpdatePersonal from './services';
import TextField from '@Components/TextField';
import DateTimePickerMain from '@Components/DatePicker';
import CustomButton from '@Components/CustomButton';
import {Colors} from 'react-native-ui-lib';
import ImagePicker from '@Components/ImagePicker';

export default function Screen(nav: NativeStackScreenProps<any>) {
  const {
    avatar,
    setAvatar,
    username,
    setUsername,
    name,
    setName,
    date,
    setDate,
    handleUpdate,
    handleSetBlob,
  } = useUpdatePersonal(nav);

  return (
    <MainContainer
      showBackButton
      title={translate('nav.updateHeader')}
      showHeader
      paddingH={12}>
      <ImagePicker
        avatarUrl={avatar}
        setAvatar={setAvatar}
        action={handleSetBlob}
      />
      <TextField
        value={username}
        onChangeValue={setUsername}
        placeholder={translate('register.usernamePH')}
        keyboardType="default"
        fontSize="lg"
        leftIcon={
          <SimpleLineIcons name="tag" size={28} color={Colors.grey30} />
        }
      />
      <TextField
        value={name}
        onChangeValue={setName}
        placeholder={translate('register.namePH')}
        fontSize="lg"
        leftIcon={
          <SimpleLineIcons name="user" size={26} color={Colors.grey30} />
        }
      />
      <DateTimePickerMain
        mode="date"
        value={date}
        onChangeValue={setDate}
        placeholder={translate('register.birthdayPH')}
      />
      <CustomButton
        onPress={handleUpdate}
        label={translate('nav.updateButton')}
        textColor="white"
        textSize="lg"
        containerStyle={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: Colors.primary,
          marginVertical: 8,
          borderRadius: 6,
        }}
      />
    </MainContainer>
  );
}
