import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';

import ScreenNames from '@Constants/ScreenNames';
import {translate} from '@Languages/index';
import ShowMessage from '@Utils/Message';

export default function useResigster(nav: NativeStackScreenProps<any>) {
  const {navigation, route} = nav;
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>();

  const handleRegister = () => {
    if (!name || !date || !phoneNumber) {
      ShowMessage(`${translate('register.missingField')}`, 'danger');
      return;
    }
    navigation.replace(ScreenNames.MainTab);
  };

  return {
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    name,
    setName,
    date,
    setDate,
    handleRegister,
  };
}
