import React, {memo, useState} from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import Paragraph from "../../../../components/Paragraph";
import TextInput from "../../../../components/TextInput";
import DateTimePicker from "../../../../components/DateTimePicker";
import {Validate} from "../../../../utils/utils";

type Props = {
    name: any,
    setName: any,
    lastName: any,
    setLastName: any,
    rut: any,
    setRut: any,
    inputs: any,
    dateOfBirth,
    setDateOfBirth
};

const FirstStep = ({name, setName, lastName, setLastName, rut, setRut, inputs,
                       dateOfBirth, setDateOfBirth}: Props) => {

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const _toggleDatePickerVisibility = () => {
        setIsDatePickerVisible(!isDatePickerVisible);
        Keyboard.dismiss();
    };

    const _handleDatePickerConfirm = (date) => {
        _toggleDatePickerVisibility();
        setDateOfBirth({value: date, error: ''});
    };

    const _handleNameInput = (nameInput: string) => {
        setName({value: nameInput, error: Validate.name(nameInput)});
    }

    const _handleLastNameInput = (lastNameInput: string) => {
        setLastName({value: lastNameInput, error: Validate.lastName(lastNameInput)});
    }

    const _handleRutInput = (rutInput: string) => {
        Validate.rut(rutInput, setRut);
    }

    return (
        <View>
            <Paragraph>Cuentanos sobre ti...</Paragraph>
            <TextInput
                label="Nombre"
                returnKeyType="next"
                value={name.value}
                onChangeText={_handleNameInput}
                error={name.error}
                errorText={name.error}
                textStyle={styles.input}
                autoCapitalize="words"
                onSubmitEditing={() => inputs['Apellidos'].focus()}
            />

            <TextInput
                label="Apellidos"
                reference={inputs}
                returnKeyType="next"
                value={lastName.value}
                onChangeText={_handleLastNameInput}
                error={lastName.error}
                errorText={lastName.error}
                textStyle={styles.input}
                autoCapitalize="words"
                onSubmitEditing={() => inputs['Rut'].focus()}
            />

            <TextInput
                label="Rut"
                reference={inputs}
                returnKeyType="next"
                keyboardType={'numeric'}
                value={rut.value}
                onChangeText={_handleRutInput}
                error={rut.error}
                errorText={rut.error}
                textStyle={styles.input}
                onSubmitEditing={_toggleDatePickerVisibility}
            />

            <DateTimePicker
                label="Fecha de nacimiento"
                reference={inputs}
                value={dateOfBirth}
                textStyle={styles.input}
                isVisible={isDatePickerVisible}
                onConfirm={_handleDatePickerConfirm}
                toggleDatePicker={_toggleDatePickerVisibility}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
    },
    cardView: {
        flexDirection: 'row',
        padding: 6,
    },
    text: {
        fontSize: 18,
    }
})

export default memo(FirstStep);
