import {View, Text, Colors} from 'react-native-ui-lib';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import WebView from 'react-native-webview';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import styles from './styles';
import {formatFontWebview, textToHtml} from '@Utils/index';

export default function AboutScreen(nav: NativeStackScreenProps<any>) {
  return (
    <MainContainer
      showBackButton
      title={translate('nav.information')}
      showHeader>
      <View style={{flex: 1}}>
        <Text>
          
        </Text>
      </View>
    </MainContainer>
  );
}
