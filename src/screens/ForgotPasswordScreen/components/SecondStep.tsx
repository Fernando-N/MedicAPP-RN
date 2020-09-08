import React, {memo, useState} from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import Background from "../../../components/Background";
import {Validate} from "../../../utils/utils";

type Props = {
    inputs,
    token,
    setToken,
    password,
    setPassword,
    password2,
    setPassword2
    _onSend2Pressed
};

const FirstStep = ({inputs, token, setToken, password, setPassword, password2, setPassword2, _onSend2Pressed}: Props) => {

    const _handlePasswordInput = (passwordInput: string) => {
        setPassword({value: passwordInput, error: Validate.password(password)})
    }

    const _handlePassword2Input = (passwordInput: string) => {
        setPassword2({value: passwordInput, error: Validate.password2(passwordInput, password.value)})
    }

    return (
        <>
            <TextInput
                label="Código"
                returnKeyType="done"
                value={token.value}
                onChangeText={text => setToken({value: text, error: ''})}
                error={token.error}
                errorText={token.error}
                autoCapitalize="none"
            />

            <TextInput
                label="Contraseña"
                reference={inputs}
                returnKeyType="done"
                autoCapitalize="none"
                value={password.value}
                onChangeText={_handlePasswordInput}
                error={password.error}
                errorText={password.error}
                secureTextEntry
            />

            <TextInput
                label="Repetir contraseña"
                reference={inputs}
                returnKeyType="done"
                autoCapitalize="none"
                value={password2.value}
                onChangeText={_handlePassword2Input}
                error={password2.error}
                errorText={password2.error}
                secureTextEntry
            />

            <Button mode="contained" onPress={_onSend2Pressed} style={styles.button}>
                Enviar
            </Button>
        </>
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
