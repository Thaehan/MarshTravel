import {Animated} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '@Themes/Colors';
import {Image} from 'react-native-image-crop-picker';
import PickedImage from './PickedImage';

export default function ImagePickerSlider({
  handlePickImage,
  images,
}: {
  handlePickImage: () => void;
  images: Image[];
}) {
  return (
    <Animated.ScrollView
      horizontal
      contentContainerStyle={{paddingHorizontal: 12, marginTop: 8}}
      showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        onPress={handlePickImage}
        padding-20
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: 12,
        }}>
        <MaterialIcons name="image" size={50} color={COLORS.primary} />
      </TouchableOpacity>
      {images.map(item => {
        return <PickedImage uri={item.path} key={item.path} />;
      })}
    </Animated.ScrollView>
  );
}
