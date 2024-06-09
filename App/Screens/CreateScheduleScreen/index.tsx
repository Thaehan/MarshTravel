import {View, Text, Carousel} from 'react-native-ui-lib';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import Animated from 'react-native-reanimated';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import useCreateSchedule from './services';
import CustomButton from '@Components/CustomButton';
import TextField from '@Components/TextField';
import styles from './styles';
import DateTimePickerMain from '@Components/DatePicker';
import SelectBox from '@Components/SelectBox';

export default function CreateScheduleScreen(nav: NativeStackScreenProps<any>) {
  const {
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
  } = useCreateSchedule(nav);

  const renderStep1 = () => {
    return (
      <View style={styles.step1Container}>
        <Text semiBold xxl>
          {translate('createSchedule.step1_ask')}
        </Text>
        <TextField
          placeholder={translate('createSchedule.step1_ph')}
          value={name}
          onChangeValue={setName}
          fontSize="lg"
          type="secondary"
        />
        <CustomButton
          label={translate('createSchedule.step1_next')}
          onPress={handleNextStep1}
          containerStyle={styles.nextStepButton}
          textColor="white"
        />
      </View>
    );
  };

  const renderStep2 = () => {
    return (
      <View style={styles.step2Container}>
        <Text xxl semiBold>
          {translate('createSchedule.step2_ask')}
        </Text>
        <DateTimePickerMain
          mode="date"
          value={startDate}
          onChangeValue={setStartDate}
          placeholder={translate('createSchedule.startPH')}
          required
        />
        <CustomButton
          label={translate('createSchedule.step1_next')}
          onPress={handleNextStep2}
          containerStyle={styles.nextStepButton}
          textColor="white"
        />
      </View>
    );
  };

  const renderStep3 = () => {
    return (
      <View style={styles.step2Container}>
        <Text semiBold xxl>{`${translate('createSchedule.step3_ask')}`}</Text>
        <View row bottom>
          <TextField
            value={dayLong?.toString() ?? ''}
            onChangeValue={(text: string) => setDayLong(+text)}
            fontSize="xl"
            type="secondary"
            keyboardType="number-pad"
            width={'10%'}
            centerText
            maxLength={2}
          />
          <Text marginB-4 regular lg>
            {` ${translate('createSchedule.step3_unit')}`}
          </Text>
        </View>
        {dayLong != undefined && dayLong > 0 && (
          <Animated.View style={[animationStyle]}>
            <Text regular lg>
              {`${translate('createSchedule.step3_askConfirm')} ${moment(
                startDate,
              )
                .add(dayLong ? dayLong - 1 : 0, 'day')
                .format('DD/MM/YYYY')}.`}
            </Text>
          </Animated.View>
        )}
        <CustomButton
          label={translate('createSchedule.step1_next')}
          onPress={handleNextStep3}
          containerStyle={styles.nextStepButton}
          textColor="white"
        />
      </View>
    );
  };

  const renderStep4 = () => {
    return (
      <View style={styles.step2Container}>
        <Text semiBold xxl>{`${translate('createSchedule.step4_ask')}`}</Text>
        <View row bottom>
          <SelectBox
            defaultValue={province}
            setValue={setProvince}
            data={data}
            fontSize="lg"
            blurBackground
          />
        </View>
        <CustomButton
          label={translate('createSchedule.step1_next')}
          onPress={handleNextStep4}
          containerStyle={styles.nextStepButton}
          textColor="white"
        />
      </View>
    );
  };

  const renderStep5 = () => {
    return (
      <View style={styles.step1Container}>
        <Text semiBold xxl>
          {translate('createSchedule.step5_ask')}
        </Text>
        <TextField
          placeholder={translate('createSchedule.step5_ph')}
          value={description}
          onChangeValue={setDescription}
          fontSize="lg"
          type="secondary"
          numberOfLines={3}
          multiLines
        />
        <CustomButton
          label={translate('createSchedule.step4_button')}
          onPress={handleNextStep5}
          containerStyle={styles.nextStepButton}
          textColor="white"
        />
      </View>
    );
  };

  return (
    <MainContainer showBackButton isFullScreen>
      <Animated.View>
        {/* <ImageBackground
          source={require('@Assets/Images/create_frame.jpg')}
          resizeMode="cover"> */}
        <Carousel
          ref={carouselRef}
          scrollEnabled={false}
          style={{height: '100%', width: '100%'}}>
          {renderStep1()}
          {renderStep2()}
          {renderStep3()}
          {renderStep4()}
          {renderStep5()}
        </Carousel>
        {/* </ImageBackground> */}
      </Animated.View>
    </MainContainer>
  );
}
