import React, {useLayoutEffect, useRef, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

import ShadowBox from '@Utils/ShadowBox';

const OTPInput = (props: {
  codeInputLength: any;
  codeLength: any;
  textInputStyle?: any;
  containerStyle?: any;
  autoFocus?: any;
  onChange?: any;
  secureTextEntry?: any;
  onDone?: any;
  defaultValue?: any;
}) => {
  const {
    codeLength,
    textInputStyle,
    containerStyle,
    autoFocus,
    codeInputLength,
    onChange,
    secureTextEntry,
    onDone,
    defaultValue,
  } = props;

  const [codeArr, setCodeArr] = useState(new Array(codeLength).fill(''));
  const currentIndex = useRef(0);
  const codeInputRefs = useRef([]);
  const timeout = useRef();
  const selectionPosition = useRef();

  useLayoutEffect(() => {
    if (defaultValue?.resultArray && codeLength && codeInputLength) {
      setCodeArr(defaultValue.resultArray);
      return;
    }
    if (defaultValue?.resultString && codeLength && codeInputLength) {
      let newArr = [];
      for (let i = 0; i < codeLength; i++) {
        newArr[i] = (defaultValue?.resultString + '').substring(
          codeInputLength * i,
          codeInputLength * (i + 1),
        );
      }
      setCodeArr(newArr);
    }

    return () => timeout.current && clearTimeout(timeout.current);
  }, [defaultValue]);

  const setFocus = (index: number) => {
    //@ts-expect-error
    codeInputRefs.current[index]?.focus();
  };

  const blur = (index: number) => {
    //@ts-expect-error
    codeInputRefs.current[index]?.blur();
  };

  const onInputCode = (text: string, index: number) => {
    currentIndex.current = index;
    let newCodeArr = [...codeArr];
    newCodeArr[index] = text;
    onChange &&
      onChange({resultString: newCodeArr.join(''), resultArray: newCodeArr});

    //type last character
    if (index == codeLength - 1) {
      if (newCodeArr[index].length === codeInputLength) {
        blur(index);
        onDone && onDone(newCodeArr.join(''));
      }
    } else {
      if (newCodeArr[index].length < codeInputLength) {
        setCodeArr(newCodeArr);
      } else {
        setFocus(index + 1);
      }
    }
    setCodeArr(newCodeArr);
  };

  const handleBackSpace = (e: any, index: number) => {
    if (
      index > 0 &&
      e.nativeEvent.key === 'Backspace' &&
      codeArr[index]?.length === 0
    ) {
      setFocus(index - 1);
      onInputCode(codeArr[index - 1].slice(0, -1), index - 1);
      return;
    }
    if (
      index > 0 &&
      e.nativeEvent.key === 'Backspace' &&
      codeArr[index]?.length > 0 &&
      //@ts-expect-error
      selectionPosition.current?.start === 0 &&
      //@ts-expect-error
      selectionPosition.current?.end === 0
    ) {
      setFocus(index - 1);
      onInputCode(codeArr[index - 1].slice(0, -1), index - 1);
    }
  };

  const renderItem = () => {
    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      codeInputs.push(
        <TextInput
          {...props}
          allowFontScaling={false}
          onKeyPress={e => handleBackSpace(e, i)}
          key={`${i}`}
          //@ts-expect-error
          ref={ref => (codeInputRefs.current[i] = ref)}
          style={{
            flex: 1,
            textAlign: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth * 2,
            borderRadius: 6,
            borderColor: 'black',
            marginHorizontal: 8,
            padding: 0,
            paddingVertical: 4,
            ...textInputStyle,
          }}
          selectionColor={'#00A2AB'}
          onSelectionChange={e =>
            //@ts-expect-error
            (selectionPosition.current = e.nativeEvent.selection)
          }
          onFocus={() => {
            selectionPosition.current = codeArr[i].length || 0;
          }}
          onBlur={() => {}}
          secureTextEntry={secureTextEntry}
          underlineColorAndroid="transparent"
          returnKeyType={'done'}
          autoFocus={autoFocus && i == 0}
          onChangeText={text => onInputCode(text, i)}
          maxLength={codeInputLength}
          keyboardType="number-pad"
          defaultValue={
            codeArr?.[i]
            // defaultValue?.substring(
            //   codeInputLength * i,
            //   codeInputLength * (i + 1),
            // )
          }
        />,
      );
    }
    return codeInputs;
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        ...containerStyle,
      }}>
      {renderItem()}
    </View>
  );
};

export default OTPInput;
