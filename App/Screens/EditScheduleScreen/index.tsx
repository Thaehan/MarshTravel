import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Colors, Text} from 'react-native-ui-lib';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import styles from './styles';
import TextField from '@Components/TextField';
import useEditScheudleScreen from './services';
import CustomButton from '@Components/CustomButton';
import {ITripDay} from '@Types/index';
import EditingTripdayItem from '@Components/EditingTripdayItem';
import ShadowBox from '@Utils/ShadowBox';
import {COLORS} from '@Themes/Colors';

export default function EditScheduleScreen(nav: NativeStackScreenProps<any>) {
  const {
    currentName,
    setCurrentName,
    onChangeCurrentName,
    onPressUpdate,
    currentListTripday,
    setCurrentListTripday,
    onPressAddTripDay,
    onPressDeleteTripDay,
    showButtonTitle,
    handleScroll,
    currentDescription,
    setCurrentDescription,
    startAt,
  } = useEditScheudleScreen(nav);

  const renderItem = (renderParams: RenderItemParams<ITripDay>) => {
    return (
      <EditingTripdayItem
        startAt={startAt}
        renderParams={renderParams}
        onPressDeleteTripDay={onPressDeleteTripDay(renderParams.item)}
      />
    );
  };

  return (
    <MainContainer
      showBackButton
      showHeader
      title={translate('detailSchedule.edit')}>
      <Text semiBold xl marginH-12 marginB-4>
        {translate('detailSchedule.editNameTitle')}
      </Text>
      <TextField
        placeholder={translate('detailSchedule.editNameTitle')}
        value={currentName}
        onChangeValue={onChangeCurrentName}
        style={styles.textField}
        containerStyle={styles.textFieldContainer}
        numberOfLines={2}
        leftIcon={
          <SimpleLineIcons name="tag" size={28} color={Colors.grey30} />
        }
      />
      <Text semiBold xl marginH-12 marginB-4>
        {translate('detailSchedule.descriptionTitle')}
      </Text>
      <TextField
        placeholder={translate('detailSchedule.descriptionPH')}
        value={currentDescription}
        onChangeValue={setCurrentDescription}
        style={styles.textField}
        containerStyle={styles.textFieldContainer}
        multiLines
        leftIcon={
          <SimpleLineIcons name="note" size={28} color={Colors.grey30} />
        }
      />
      <Text semiBold xl marginH-12 marginB-4>
        {translate('detailSchedule.editList')}
      </Text>
      <NestableScrollContainer onScroll={handleScroll}>
        <NestableDraggableFlatList
          onScroll={handleScroll}
          data={currentListTripday}
          renderItem={renderItem}
          keyExtractor={(item, index) => `DaylistItem-${index}`}
          onDragEnd={({data}) => {
            setCurrentListTripday(data);
          }}
        />
        <CustomButton
          icon={
            <SimpleLineIcons
              name="plus"
              size={20}
              color={COLORS.backgroundMain}
              style={{marginRight: 4}}
            />
          }
          label={translate('detailSchedule.addDay')}
          textColor={COLORS.backgroundMain}
          containerStyle={[
            {
              paddingHorizontal: 8,
              flex: 1,
              backgroundColor: Colors.grey40,
              marginHorizontal: 12,
              borderRadius: 6,
              paddingVertical: 12,
              marginVertical: 8,
              alignItems: 'center',
              justifyContent: 'center',
            },
            ShadowBox.boxShadow,
          ]}
          onPress={onPressAddTripDay}
        />
      </NestableScrollContainer>
      <CustomButton
        disable={currentName.length === 0 || currentDescription.length === 0}
        onPress={onPressUpdate}
        label={translate('detailSchedule.doneEdit')}
        textColor="white"
        containerStyle={styles.registerButton}
      />
    </MainContainer>
  );
}
