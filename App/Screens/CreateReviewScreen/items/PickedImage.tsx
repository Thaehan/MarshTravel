import React from 'react';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-ui-lib';

export default function PickedImage({uri}: {uri: string}) {
  return (
    <TouchableOpacity marginH-12>
      <FastImage
        source={{uri}}
        style={{height: 100, aspectRatio: 1.0, borderRadius: 12}}
      />
    </TouchableOpacity>
  );
}
