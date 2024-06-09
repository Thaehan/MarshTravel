import {View, Text, Colors} from 'react-native-ui-lib';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import MainContainer from '@Containers/MainContainer';
import CustomButton from '@Components/CustomButton';
import AnimationScreenContainer from '@Containers/AnimationScreenContainer';
import {translate} from '@Languages/index';
import usePersonal from './services';
import styles from './styles';
import {COLORS} from '@Themes/Colors';

export default function PersonalScreen(nav: any) {
  const {
    handleLogout,
    currentUser,
    handleNavigateToUpdate,
    handleNavigateToWallet,
    handleNavigateToMyPost,
    handleNavigateToSetting,
    handleNavigateToAbout,
    handleNavigateToSavedReview,
  } = usePersonal(nav);

  return (
    <MainContainer>
      <AnimationScreenContainer>
        <View centerH paddingV-16>
          <FastImage
            style={{height: 100, width: 100, borderRadius: 100}}
            source={{uri: currentUser.avatar}}
          />
          <Text regular xxl marginT-4>
            {currentUser.name}
          </Text>
          <CustomButton
            label={translate('nav.update')}
            onPress={handleNavigateToUpdate}
            containerStyle={styles.updateButton}
            textColor={COLORS.backgroundMain}
          />
        </View>
        {/* <CustomButton
          label={translate('nav.wallet')}
          onPress={handleNavigateToWallet}
          containerStyle={styles.optionButton}
          textSize="xl"
          textColor={Colors.black}
          icon={
            <MaterialCommunityIcons
              name="wallet"
              size={30}
              style={styles.iconButton}
            />
          }
        /> */}
        <CustomButton
          label={translate('nav.myReview')}
          onPress={handleNavigateToMyPost}
          containerStyle={styles.optionButton}
          textSize="xl"
          textColor={Colors.black}
          icon={
            <MaterialCommunityIcons
              name="history"
              size={30}
              style={styles.iconButton}
            />
          }
        />
        <CustomButton
          label={translate('nav.savedReview')}
          onPress={handleNavigateToSavedReview}
          containerStyle={styles.optionButton}
          textSize="xl"
          textColor={Colors.black}
          icon={
            <MaterialIcon
              name="bookmark-outline"
              size={30}
              style={styles.iconButton}
            />
          }
        />
        <CustomButton
          label={translate('nav.setting')}
          onPress={handleNavigateToSetting}
          containerStyle={styles.optionButton}
          textSize="xl"
          textColor={Colors.black}
          icon={
            <Ionicons
              name="settings-outline"
              size={30}
              style={styles.iconButton}
            />
          }
        />
        {/* <CustomButton
          label={translate('nav.information')}
          onPress={handleNavigateToAbout}
          containerStyle={styles.optionButton}
          textSize="xl"
          textColor={Colors.black}
          icon={
            <MaterialCommunityIcons
              name="information-outline"
              size={30}
              style={styles.iconButton}
            />
          }
        /> */}
        <CustomButton
          label={translate('nav.logout')}
          onPress={handleLogout}
          containerStyle={styles.optionButton}
          textSize="xl"
          textColor={Colors.black}
          icon={
            <MaterialIcon name="logout" size={30} style={styles.iconButton} />
          }
        />
      </AnimationScreenContainer>
    </MainContainer>
  );
}
