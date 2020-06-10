import React, {memo} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import TextInput from "./TextInput";
import moment from "moment";
import 'moment/locale/es'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = React.ComponentProps<typeof TextInput> & {isVisible?: boolean} & {mode?: string}
    & {value?: {}} & {toggleDatePicker?: Function } & {onConfirm?: Function} ;

const DateTimePicker = ({textInputProps, isVisible, mode, value, toggleDatePicker, onConfirm}: Props) => (
    <>
        <TouchableWithoutFeedback onPress={toggleDatePicker}>

            <View  style={{width: '100%'}}>

                <TextInput
                    label="Fecha de nacimiento"
                    returnKeyType="next"
                    value={
                        moment(value.value)
                            .locale('es')
                            .format('dddd DD [de] MMMM [de] YYYY')
                    }
                    error={value.error}
                    errorText={value.error}
                    {...textInputProps}
                    editable={false}
                />

            </View>

        </TouchableWithoutFeedback>

        <DateTimePickerModal
            isVisible={isVisible}
            mode={ mode ? mode : 'date' }
            onConfirm={onConfirm}
            onCancel={toggleDatePicker}
            locale={'es_ES'}
            date={value.value}
            disabled
        />

    </>
);

const styles = StyleSheet.create({

});

export default memo(DateTimePicker);
