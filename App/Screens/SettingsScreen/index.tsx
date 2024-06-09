import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, TouchableOpacity, Image} from 'react-native-ui-lib';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import MainContainer from '@Containers/MainContainer';
import useSettings from './services';
import {translate} from '@Languages/index';
import {COLORS} from '@Themes/Colors';

export default function SettingScreen(nav: NativeStackScreenProps<any>) {
  const {changeLanguage, currentLang} = useSettings(nav);

  return (
    <MainContainer showBackButton showHeader title={translate('nav.setting')}>
      <TouchableOpacity
        onPress={changeLanguage}
        paddingH-12
        marginH-12
        padidngV-8
        row
        centerV
        style={{
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderRadius: 10,
          paddingVertical: 8,
          borderColor: COLORS.border,
        }}>
        <Text xl regular>
          {translate('nav.changeLanguage')}
        </Text>
        <Image
          height={30}
          width={30}
          source={
            currentLang == 'en'
              ? require('@Assets/Images/en.png')
              : require('@Assets/Images/vi.png')
          }
          style={{borderRadius: 50}}
        />
      </TouchableOpacity>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  updateButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    textAlign: 'center',
  },
  optionButton: {
    marginVertical: 6,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white1,
  },
  iconButton: {
    marginRight: 20,
    color: COLORS.black1,
  },
});
