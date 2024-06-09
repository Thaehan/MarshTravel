import {View, Text} from 'react-native-ui-lib';
import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import Dimensions from '@Utils/Dimensions';
import {COLORS} from '@Themes/Colors';

const width = Dimensions.width;

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function PostLoading() {
  return <ShimmerPlaceHolder />;
}
