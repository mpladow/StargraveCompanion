import {StyleSheet, View} from 'react-native';
import React, {forwardRef, ReactElement, ReactNode, useState} from 'react';
import {Controller, FieldValues, FieldErrors, Control} from 'react-hook-form';
import {TextInput, useTheme} from 'react-native-paper';
import Text from './Text';
import {DropdownItem, ForcedAny} from '../../../types/types';
import DropDown, {DropDownPropsInterface} from 'react-native-paper-dropdown';

interface DropdownFieldProps {
  fieldName: ForcedAny<'No Need to force a type'>;
  control: Control<ForcedAny<'Inferred values from form'>>;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  values: DropdownItem[];
}
const DropdownField = forwardRef<any, DropdownFieldProps>(
  (
    {
      fieldName,
      control,
      onFocus,
      label,
      values,
      ...props
    },
    ref,
  ): ReactElement => {
    const {colors} = useTheme();
    const [showDropdown, setShowDropdown] = useState(false)
    return (
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View style={{marginBottom: 4}}>
            <DropDown
              label={label}
              mode={'outlined'}
              visible={showDropdown}
              showDropDown={() => setShowDropdown(true)}
              onDismiss={() => setShowDropdown(false)}
              value={value}
              setValue={onChange}
              list={values}
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

export default DropdownField;

const styles = StyleSheet.create({});
