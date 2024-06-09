import {Text} from 'react-native-ui-lib';
import StarRating from 'react-native-star-rating-widget';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import MainContainer from '@Containers/MainContainer';
import useCreatedReviewScreen from './services';
import {translate} from '@Languages/index';
import AnimationScreenContainer from '@Containers/AnimationScreenContainer';
import TextField from '@Components/TextField';
import styles from './styles';
import ImagePickerSlider from './items/ImagePickerSlider';
import {COLORS} from '@Themes/Colors';
import CustomButton from '@Components/CustomButton';

export default function CreateReviewScreen(nav: NativeStackScreenProps<any>) {
  const {handlePickImage, handlePostReview, textData, setTextData, imageData} =
    useCreatedReviewScreen(nav);

  const renderTitleContent = () => {
    return (
      <>
        <Text semiBold xl marginH-12 marginB-4>
          {translate('review.createTitle')}
        </Text>
        <TextField
          multiLines
          value={textData.title}
          placeholder={translate('review.createTitlePH')}
          onChangeValue={(text: string) => {
            setTextData({...textData, title: text});
          }}
          style={styles.textField}
          containerStyle={styles.textFieldContainer}
        />
      </>
    );
  };

  const renderDescriptionContent = () => {
    return (
      <>
        <Text semiBold xl marginH-12 marginB-4>
          {translate('review.createDescription')}
        </Text>
        <TextField
          multiLines
          value={textData.description}
          placeholder={translate('review.createDescriptionPH')}
          onChangeValue={(text: string) => {
            setTextData({...textData, description: text});
          }}
          style={styles.textField}
          containerStyle={styles.textFieldContainer}
        />
      </>
    );
  };

  const renderImage = () => {
    return (
      <>
        <Text semiBold xl marginH-12 marginB-4>
          {translate('review.createImage')}
        </Text>
        <ImagePickerSlider
          handlePickImage={handlePickImage}
          images={imageData}
        />
      </>
    );
  };

  const renderRating = () => {
    return (
      <>
        <Text semiBold xl marginH-12 marginB-4 marginT-8>
          {translate('review.createRating')}
        </Text>
        <StarRating
          rating={textData.rating}
          onChange={rating => {
            setTextData({...textData, rating});
          }}
          enableHalfStar={false}
          color={COLORS.secondary}
          style={{marginVertical: 12, alignSelf: 'center'}}
        />
      </>
    );
  };

  const renderPostButton = () => {
    return (
      <CustomButton
        label={translate('review.createButton')}
        containerStyle={styles.bottomButton}
        onPress={handlePostReview}
        textColor={COLORS.white1}
        textSize="lg"
      />
    );
  };

  return (
    <MainContainer
      showBackButton
      showHeader
      title={translate('review.createReview')}>
      <AnimationScreenContainer>
        {renderTitleContent()}
        {renderDescriptionContent()}
        {renderImage()}
        {renderRating()}
        {renderPostButton()}
      </AnimationScreenContainer>
    </MainContainer>
  );
}
