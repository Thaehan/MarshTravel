import {TouchableOpacity} from 'react-native-ui-lib';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FastImage from 'react-native-fast-image';

export default function ImagePicker({
  avatarUrl,
  setAvatar,
  action,
}: {
  avatarUrl?: string;
  setAvatar?: Function;
  action?: Function;
}) {
  const [current, setCurrent] = useState<string>(avatarUrl ?? '');

  const openImage = async () => {
    try {
      const pickedImage = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (
        pickedImage &&
        pickedImage.assets &&
        setAvatar &&
        pickedImage.assets[0].uri
      ) {
        setCurrent(pickedImage.assets[0].uri);
        setAvatar(pickedImage.assets[0].uri);
        if (action && pickedImage.assets) {
          await action(pickedImage.assets[0]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={openImage}
      center
      paddingV-8
      style={{alignSelf: 'center'}}>
      <SimpleLineIcons
        name="camera"
        size={44}
        style={{zIndex: 100, position: 'absolute'}}
      />
      <FastImage
        style={{height: 100, width: 100, borderRadius: 100}}
        source={{uri: current}}
      />
    </TouchableOpacity>
  );
}
