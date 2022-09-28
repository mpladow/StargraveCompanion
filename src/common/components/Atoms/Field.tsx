import {StyleSheet, View} from 'react-native';
import React, {forwardRef, ReactElement, ReactNode} from 'react';
import {Controller, FieldValues, FieldErrors, Control} from 'react-hook-form';
import {TextInput, useTheme} from 'react-native-paper';
import Text from './Text';
import { ForcedAny } from '../../../types/types';

interface FieldProps {
  fieldName: string;
  control: Control<ForcedAny<'Inferred values from form'>>;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  disabled?: boolean;
  right?: ReactNode;
  placeholder: string;
}
const Field = forwardRef<any, FieldProps>(
  ({fieldName, control, onFocus, label, ...props}, ref): ReactElement => {
    const {colors} = useTheme();
    return (
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View style={{marginBottom: 4}}>
            <TextInput
            // ref={ref}
            mode={'outlined'}
              value={value}
              style={{color: colors.primary}}
              label={label}
              onBlur={onBlur}
              onChangeText={onChange}
              {...props}
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
