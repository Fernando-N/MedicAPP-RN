import React, {memo, useState} from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";

type Props = {
    email,
    setEmail,
    _onSendPressed
};

const FirstStep = ({email, setEmail, _onSendPressed}: Props) => {
    return (
        <>
            <TextInput
                label="Email"
                returnKeyType="done"
                value={email.value}
                onChangeText={text => setEmail({value: text, error: ''})}
                error={email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
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
