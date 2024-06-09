import {Typography} from 'react-native-ui-lib';

import {fontFamilies, fontSizes} from './Fonts';
import {COLORS} from './Colors';

Typography.loadTypographies({
  italic: {
    fontStyle: 'italic',
  },
  underline: {textDecorationLine: 'underline'},
  thin: {
    fontFamily: fontFamilies.primaryThin,
  },
  light: {
    fontFamily: fontFamilies.primaryLight,
  },
  medium: {
    fontFamily: fontFamilies.primaryMedium,
  },
  regular: {
    fontFamily: fontFamilies.primaryRegular,
  },
  semiBold: {
    fontFamily: fontFamilies.primarySemiBold,
  },
  bold: {
    fontFamily: fontFamilies.primaryBold,
  },
  extraBold: {
    fontFamily: fontFamilies.primaryExtraBold,
  },
  tiny: {
    fontSize: fontSizes.tiny,
    lineHeight: 12,
  },
  xxss: {
    fontSize: fontSizes.xxss,
    lineHeight: 16,
  },
  xxs: {
    fontSize: fontSizes.xxs,
    lineHeight: 16,
  },
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: 16,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: 18,
  },
  md: {
    fontSize: fontSizes.md,
    lineHeight: 20,
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: 24,
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: 30,
  },
  xxl: {
    fontSize: fontSizes.xxl,
    lineHeight: 30,
  },
  giga: {
    fontSize: fontSizes.avo_xxl,
    lineHeight: 42,
  },
  placeholder: {
    color: COLORS.unfocus,
  },
});
