import React from 'react';
import {Keyboard} from 'react-native';
import {View, Text, TouchableOpacity, Image, Colors} from 'react-native-ui-lib';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

import MainContainer from '@Containers/MainContainer';
import CustomButton from '@Components/CustomButton';
import {translate} from '@Languages/index';
import useLogin from './services';
import styles from './styles';
import TextField from '@Components/TextField';
import {COLORS} from '@Themes/Colors';
import OTPInput from './items/OTPInput';
import Dimensions from '@Utils/Dimensions';

export default function LoginScreen(nav: NativeStackScreenProps<any>) {
  const {
    onChangeLanguage,
    currentLang,
    onSignInGoogle,
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
  } = useLogin(nav);

  const renderLanguage = () => {
    return (
      <View right paddingH-8>
        <TouchableOpacity row centerV onPress={onChangeLanguage}>
          <Image
            height={30}
            width={30}
            source={
              currentLang == 'en'
                ? require('@Assets/Images/en.png')
                : require('@Assets/Images/vi.png')
            }
            style={styles.language}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderLogo = () => {
    return (
      <View center marginV-16>
        <Image
          source={require('@Assets/Images/logo.png')}
          height={80}
          width={80}
        />
        <Text xxl regular>
          Marsh Travel
        </Text>
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        backdropOpacity={0.5}
        isVisible={modalVisbile}
        useNativeDriver
        ref={otpModal}
        onBackdropPress={() => {
          Keyboard.dismiss();
        }}
        style={{margin: 0, padding: 0}}>
        <View
          paddingV-20
          backgroundColor={COLORS.backgroundMain}
          style={[
            {
              minWidth: '80%',
              borderRadius: 8,
              minHeight: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text lg regular style={{textAlign: 'left'}}>
            {translate('login.verifyOTP')}
          </Text>
          <LottieView
            autoPlay
            source={require('@Assets/Animations/OTP.json')}
            style={{
              height: 200,
              width: 200,
              marginVertical: 12,
            }}
          />
          <Text regular md>
            {translate('login.descriptionOTP')}
          </Text>
          <OTPInput
            codeLength={6}
            codeInputLength={1}
            containerStyle={{marginVertical: 12, width: '90%'}}
            onChange={(result: {
              resultString: string;
              resultArray: Array<String>;
            }) => {
              setCode(result.resultString);
              console.log('text', result.resultString);
            }}
          />
          <View width="100%" row center marginB-8>
            <Text regular md>
              {translate('login.notRecieveOTP')}
            </Text>
            <CustomButton
              disable={cooldown !== 0}
              onPress={onPressResend}
              label={translate('login.sendOTP')}
              textColor={cooldown === 0 ? COLORS.primary : COLORS.gray1}
              containerStyle={styles.registerButton}
              disableChangeBackground
            />
          </View>
          {cooldown > 0 && (
            <Text regular md marginB-16>{`${translate(
              'login.resendDescription',
            )} ${cooldown}s`}</Text>
          )}
          <View width="100%" row>
            <CustomButton
              disable={code.length < 6 || loadingLogin}
              onPress={onVerifyCode}
              label={!loadingLogin ? translate('login.verify') : `...`}
              textColor="white"
              containerStyle={styles.modalVerifyButton}
            />
            <CustomButton
              onPress={() => {
                setModalVisible(false);
                setCode('');
              }}
              label={translate('login.goBack')}
              textColor={COLORS.primary}
              containerStyle={styles.modalBackButton}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <MainContainer showHeader>
      <View style={styles.container}>
        {renderLanguage()}
        {renderLogo()}
        <TextField
          value={phoneNumber}
          placeholder={translate('login.phoneNumber')}
          onChangeValue={setPhoneNumber}
          keyboardType="phone-pad"
          fontSize="lg"
          leftIcon={
            <SimpleLineIcons name="phone" size={28} color={Colors.grey30} />
          }
        />
        <CustomButton
          textSize="lg"
          label={translate('login.login')}
          textColor={COLORS.backgroundMain}
          containerStyle={styles.loginButton}
          onPress={onLogin}
        />
        <CustomButton
          icon={
            <Image
              source={require('@Assets/Images/google.png')}
              style={{marginHorizontal: 6}}
              height={20}
              width={20}
            />
          }
          label={translate('login.googleLogin')}
          textColor="black"
          containerStyle={styles.googleButton}
          onPress={onSignInGoogle}
        />
        <View
          row
          style={{
            position: 'absolute',
            bottom: Dimensions.height / 8,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text light md width="100%" center>
            {'© Thaehan & Koyomi UET 2023'}
          </Text>
        </View>
      </View>
      {renderModal()}
    </MainContainer>
  );
}
