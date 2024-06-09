import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors, Image, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React, {ReactNode} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {fontFamilies} from '@Themes/Fonts';
import {getStatusBarHeight} from '@Utils/index';

const {height, width} = Dimensions.get('window');

export default function MainContainer({
  children,
  backgroundColor,
  backgroundImage,
  paddingH,
  showBackButton = false,
  title,
  showHeader,
  isFullScreen,
  subButton,
  left,
}: {
  children: any;
  backgroundColor?: string;
  backgroundImage?: any;
  paddingH?: number;
  showBackButton?: boolean;
  title?: string | ReactNode;
  showHeader?: boolean;
  isFullScreen?: boolean;
  subButton?: ReactNode;
  left?: ReactNode;
}) {
  const navigation = useNavigation();

  const handleBack = () => {
    //@ts-expect-error
    navigation.pop();
  };

  //Cannot scroll
  if (showHeader) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor ?? Colors.backgroundMain,
            paddingHorizontal: paddingH ?? 0,
          },
        ]}>
        {backgroundImage && (
          <Image
            height={height}
            width={width}
            source={backgroundImage}
            style={{position: 'absolute'}}
          />
        )}
        {title && typeof title == 'string' ? (
          <View row paddingV-6 marginH-8>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBack}
                left
                centerV
                padding-6
                style={left ? {width: '10%'} : {}}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={26}
                  color={Colors.grey10}
                />
              </TouchableOpacity>
            )}
            <View flex style={left ? {width: '80%'} : {}}>
              <Text medium xxl marginH-12 grey10 numberOfLines={2}>
                {title}
              </Text>
            </View>
            {left && (
              <View style={{width: '10%', justifyContent: 'center'}}>
                {left}
              </View>
            )}
          </View>
        ) : (
          title
        )}
        {children}
        {showBackButton && !title && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            center
            bg-white
            padding-5>
            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color={Colors.grey30}
            />
          </TouchableOpacity>
        )}
        {subButton && subButton}
      </SafeAreaView>
    );
  }

  if (isFullScreen) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor ?? Colors.backgroundMain,
            paddingHorizontal: paddingH ?? 0,
          },
        ]}>
        {backgroundImage && (
          <Image
            height={height}
            width={width}
            source={backgroundImage}
            style={{position: 'absolute'}}
          />
        )}
        {title && (
          <View row paddingV-6 paddingH-12>
            {showBackButton && (
              <TouchableOpacity
                style={{borderRadius: 100}}
                onPress={handleBack}
                center
                bg-white
                padding-5>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={26}
                  color={Colors.grey30}
                />
              </TouchableOpacity>
            )}
            <Text marginL-12 xxl regular>
              {title}
            </Text>
          </View>
        )}
        {children}
        {showBackButton && !title && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            center
            bg-white
            padding-5>
            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color={Colors.grey30}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor ?? Colors.backgroundMain,
          paddingHorizontal: paddingH ?? 0,
        },
      ]}>
      {backgroundImage && (
        <Image
          height={height}
          width={width}
          source={backgroundImage}
          style={{position: 'absolute'}}
        />
      )}
      {title && (
        <View row paddingV-6 paddingH-12>
          {showBackButton && (
            <TouchableOpacity
              style={{borderRadius: 100}}
              onPress={handleBack}
              center
              bg-white
              padding-5>
              <MaterialCommunityIcons
                name="arrow-left"
                size={26}
                color={Colors.grey30}
              />
            </TouchableOpacity>
          )}
          <Text marginL-12 xxl regular>
            {title}
          </Text>
        </View>
      )}
      {children}
      {showBackButton && !title && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          center
          bg-white
          padding-5>
          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color={Colors.grey30}
          />
        </TouchableOpacity>
      )}
      {subButton && subButton}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
    fontStyle: fontFamilies.primaryRegular,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 12,
    borderRadius: 100,
  },
});
