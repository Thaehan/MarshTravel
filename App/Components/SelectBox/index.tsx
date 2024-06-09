import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React, {useCallback, useRef, useState, useMemo} from 'react';
import {
  NativeScrollEvent,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

import {ISelectItem} from '@Types/index';
import {translate} from '@Languages/index';
import {ShadowBox, getFontsize} from '@Utils/index';
import {COLORS} from '@Themes/Colors';

export default function SelectBox<T>({
  title,
  placeholder = translate('util.selectPlaceholder'),
  data,
  defaultValue,
  setValue,
  fontSize = 'md',
  marginV,
  marginH,
  blurBackground,
}: {
  title?: string;
  data?: ISelectItem<T>[];
  placeholder?: string;
  setValue?: Function;
  defaultValue?: ISelectItem<T>;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  marginV?: number;
  marginH?: number;
  blurBackground?: boolean;
}) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentValue, setCurrentValue] = useState<ISelectItem<T> | undefined>(
    defaultValue,
  );

  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSelectItem = useCallback(
    (item: ISelectItem<T>) => {
      setCurrentValue(item);
      if (setValue) {
        setValue(item);
      }
      bottomSheetModalRef.current?.close();
    },
    [bottomSheetModalRef, currentValue],
  );

  const renderItem = (item: ISelectItem<T>) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectItem(item)}
        key={item.label}
        paddingH-12
        paddingV-12
        style={{
          backgroundColor:
            item.value === currentValue?.value
              ? COLORS.border
              : COLORS.backgroundMain,
        }}>
        <Text regular lg>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleClose = () => {
    bottomSheetModalRef.current?.close();
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        flex
        paddingV-8
        borderB={1}
        borderColor={COLORS.gray2}>
        {/* <View center> */}
        {currentValue ? (
          <Text regular style={{fontSize: getFontsize(fontSize)}}>
            {currentValue?.label}
          </Text>
        ) : (
          <Text regular style={{fontSize: getFontsize(fontSize)}} grey40>
            {placeholder}
          </Text>
        )}
        {/* </View> */}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enableDismissOnClose
        enablePanDownToClose
        backdropComponent={props => {
          if (blurBackground) {
            return (
              <TouchableOpacity
                style={styles.backdrop}
                onPress={handleClose}></TouchableOpacity>
            );
          }
          return <></>;
        }}
        backgroundStyle={[ShadowBox.boxShadow]}>
        <ScrollView ref={scrollViewRef}>
          {title != undefined && title.length && (
            <Text medium lg center>
              {title}
            </Text>
          )}
          {!data ||
            (!data.length && (
              <Text regular lg>
                {translate('util.noData')}
              </Text>
            ))}
          {data &&
            data?.map(item => {
              return renderItem(item);
            })}
        </ScrollView>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.gray1,
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
});
