import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors, DateTimePicker, Text, View} from 'react-native-ui-lib';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MainContainer from '@Containers/MainContainer';
import useResigster from './services';
import {translate} from '@Languages/index';
import TextField from '@Components/TextField';
import DateTimePickerMain from '@Components/DatePicker';
import CustomButton from '@Components/CustomButton';

export default function RegisterScreen(nav: NativeStackScreenProps<any>) {
  const {navigation, route} = nav;
  const {
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    name,
    setName,
    date,
    setDate,
    handleRegister,
  } = useResigster(nav);

  return (
    <MainContainer
      showBackButton
      title={translate('register.title')}
      showHeader
      paddingH={12}>
      <TextField
        value={phoneNumber}
        onChangeValue={setPhoneNumber}
        placeholder={translate('register.phoneNumberPH')}
        keyboardType="number-pad"
        fontSize="lg"
        leftIcon={
          <SimpleLineIcons name="phone" size={28} color={Colors.grey30} />
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
      {/* <TextField
        value={otp}
        onChangeValue={setOtp}
        placeholder={translate('register.phoneNumberPH')}
      /> */}
      <CustomButton
        onPress={handleRegister}
        label={translate('register.title')}
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
