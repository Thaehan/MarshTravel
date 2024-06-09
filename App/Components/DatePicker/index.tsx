import {View, Text, Colors, DateTimePicker} from 'react-native-ui-lib';
import React, {useState} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import {COLORS} from '@Themes/Colors';

export default function DateTimePickerMain({
  value,
  mode,
  onChangeValue,
  disabled = false,
  label,
  iconStyle,
  containerStyle,
  date,
  minDate,
  maxDate,
  required = true,
  placeholder,
  errorMessage,
  defaultValue,
  ...rest
}: {
  mode: 'date' | 'time';
  onChangeValue: (date: Date) => void;
  value: Date | undefined;
  label?: string;
  date?: Date;
  disabled?: boolean;
  iconStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  minDate?: Date;
  maxDate?: Date;
  rest?: any;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  defaultValue?: string;
}) {
  const [currentValue, setCurrentValue] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : value,
  );

  const renderInput = (input: any) => {
    if (!currentValue) {
      return (
        <View marginL-2>
          <Text regular lg grey40>
            {placeholder}
          </Text>
        </View>
      );
    }

    return (
      <View marginL-2>
        <Text regular lg grey20>
          {mode == 'date'
            ? moment(currentValue).format('DD/MM/YYYY')
            : moment(currentValue).format('HH:mm:ss')}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.defaultContainer} paddingV-12 row centerV>
      <View width="15%" center>
        <SimpleLineIcons name="calendar" size={26} color={Colors.grey30} />
      </View>
      <View width="85%">
        <DateTimePicker
          placeholder={placeholder}
          mode={mode}
          containerStyle={{
            color: Colors.grey10,
            backgroundColor: Colors.red,
            borderRadius: 8,
            width: '100%',
            height: '100%',
          }}
          renderInput={renderInput}
          value={value}
          onChange={(date: Date) => {
            onChangeValue(date);
            setCurrentValue(date);
          }}
          placeholderTextColor={Colors.grey40}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    backgroundColor: COLORS.backgroundMain,
    marginVertical: 8,
    borderRadius: 8,
    color: Colors.grey20,
    // marginHorizontal: 12,
  },
});
