import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Validate } from '../core/utils';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import ScrollContainer from '../components/ScrollContainer';
import { Navigation } from '../types';
import { AuthService } from '../clients/auth/AuthService';

type Props = {
    navigation: Navigation;
};

const ForgotPasswordScreen = ({navigation}: Props) => {
    const [email, setEmail] = useState({value: '', error: ''});

    const _onSendPressed = () => {
        const emailError = Validate.email(email.value);

        if (emailError) {
            setEmail({...email, error: emailError});
            return;
        }

        AuthService.forgotPassword(email.value);

        Alert.alert('Restablecer contaseña', `Si el correo ${email.value} se encuentra registrado recibiras un correo electronico para restablecer tu contraseña.`);

        navigation.navigate('LoginScreen');
    };

    return (
        <ScrollContainer>
            <Background>

                <Logo/>

                <Header>Recuperar contraseña</Header>

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

                <TouchableOpacity
                    style={styles.back}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={styles.label}>← Volver al login</Text>
                </TouchableOpacity>
            </Background>
        </ScrollContainer>
    );
};

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
});

export default memo(ForgotPasswordScreen);
