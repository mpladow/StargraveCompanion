import {StyleSheet, View} from 'react-native';
import React, {forwardRef, ReactElement} from 'react';
import {Controller, FieldValues, FieldErrors, Control} from 'react-hook-form';
import {TextInput, useTheme} from 'react-native-paper';
import Text from './Text';

interface FieldProps {
  fieldName: ForcedAny<'No Need to force a type'>;
  control: Control<ForcedAny<'Inferred values from form'>>;
  onFocus?: () => void;
}
const Field = forwardRef<any, FieldProps>(
  ({fieldName, control, onFocus, ...props}, ref): ReactElement => {
    const {colors} = useTheme();
    return (
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View style={{marginBottom: 4}}>
            <TextInput
              value={value}
              style={{color: colors.primary}}
              onBlur={onBlur}
              onChange={onChange}
            />
            {error?.message && (
              <View style={{paddingTop: 4}}>
                <Text style={{color: colors.error}}>{error?.message}</Text>
              </View>
            )}
          </View>
        )}
        name={fieldName}
      />
    );
  },
);

export default Field;

const styles = StyleSheet.create({});
