import {useDispatch} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Modal from 'react-native-modal';

import ScreenNames from '@Constants/ScreenNames';
import {setLoading} from '@Store/Slices/LoadingSlice';
import {setToken, setUser, setUserInformation} from '@Store/Slices/UserSlice';
import {useLanguages} from '@Hooks/languages';
import AuthApi from '@Api/AuthApi';
import Configs from '@Configs/index';
import UserApi from '@Api/UserApi';
import {ShowMessage, setAxiosDefaultToken} from '@Utils/index';
import {translate} from '@Languages/index';
import {request} from 'react-native-permissions';

const cooldownResend = 60;

export default function useLogin(nav: NativeStackScreenProps<any>) {
  const {navigation} = nav;
  const dispatch = useDispatch();
  const {systemLang: currentLang, initLanguage} = useLanguages();
  const otpModal = useRef<Modal>(null);
  const interval = useRef<any>(0);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [modalVisbile, setModalVisible] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const startCounter = () =>
    (interval.current = setInterval(() => {
      setCooldown(prevState => prevState - 1);
    }, 1000));

  const stopCounter = () => clearInterval(interval.current);

  const onPressResend = async () => {
    try {
      AuthApi.getOTP(phoneNumber);
      setCooldown(cooldownResend);
    } catch (error) {
      ShowMessage(translate('util.errorNetwork'), 'danger');
    }
  };

  const onVerifyCode = async () => {
    setLoadingLogin(true);
    try {
      const result = await AuthApi.verifyOTP(phoneNumber, code);

      if (result.data) {
        dispatch(setToken(result.data));
        setAxiosDefaultToken(result.data.accessToken);

        const userInformation = await UserApi.getUserInformation();

        if (userInformation.data) {
          dispatch(setUserInformation(userInformation.data));
        }

        navigation.replace(ScreenNames.MainTab);

        if (result.data.isNewAccount) {
          navigation.push(ScreenNames.UpdatePersonal);
        }
        ShowMessage(translate('login.loginSuccess'), 'success');
      }
    } catch (error) {
      ShowMessage(translate('util.errorNetwork'), 'danger');
    } finally {
      setLoadingLogin(false);
    }
  };

  const onLogin = async () => {
    try {
      if (phoneNumber.length < 9) {
        ShowMessage(translate('login.invalidPhonenumber'), 'danger');
        return;
      }
      if (cooldown === 0) {
        AuthApi.getOTP(phoneNumber);
      }

      setModalVisible(true);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const onRegister = ({}: {}) => {
    navigation.push(ScreenNames.Register, {});
  };

  const onSignInGoogle = async () => {
    dispatch(setLoading(true));
    try {
      await GoogleSignin.hasPlayServices();
      if (await GoogleSignin.getCurrentUser()) {
        await GoogleSignin.revokeAccess();
      }
      const googleSigninRes = await GoogleSignin.signIn();
      if (googleSigninRes && googleSigninRes.idToken) {
        const loginRes = await AuthApi.googleLogin(googleSigninRes.idToken);
        console.log('accessToken', loginRes.data?.accessToken);

        if (loginRes && loginRes.data) {
          dispatch(setToken(loginRes.data));
          setAxiosDefaultToken(loginRes.data.accessToken);

          const userInformation = await UserApi.getUserInformation();

          if (userInformation.data) {
            dispatch(setUserInformation(userInformation.data));
          }

          navigation.replace(ScreenNames.MainTab);

          if (loginRes.data.isNewAccount) {
            navigation.push(ScreenNames.UpdatePersonal);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const intGeolocation = async () => {
    try {
      GoogleSignin.configure({
        webClientId: Configs.OAUTH_WEB_CLIENT_ID,
        offlineAccess: true,
        forceCodeForRefreshToken: true,
      });
      await request('android.permission.ACCESS_FINE_LOCATION');
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeLanguage = () => {
    const lang = currentLang == 'en' ? 'vi' : 'en';
    initLanguage(lang);
  };

  useEffect(() => {
    intGeolocation();
  }, []);

  useEffect(() => {
    if (cooldown == cooldownResend) {
      startCounter();
    }
    if (cooldown === 0) {
      stopCounter();
    }
  }, [cooldown]);

  return {
    onChangeLanguage,
    currentLang,
    onSignInGoogle,
    onRegister,
    onLogin,
    phoneNumber,
    setPhoneNumber,
    otpModal,
    modalVisbile,
    setModalVisible,
    code,
    setCode,
    onVerifyCode,
    onPressResend,
    cooldown,
    loadingLogin,
  };
}
