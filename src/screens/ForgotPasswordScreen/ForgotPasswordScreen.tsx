import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Validate } from '../../utils/utils';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import { theme } from '../../core/theme';
import ScrollContainer from '../../components/ScrollContainer';
import {AuthService, NavigationService} from "../../services";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";

const ForgotPasswordScreen = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState({value: '', error: ''});
    const [token, setToken] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [password2, setPassword2] = useState({value: '', error: ''});

    let inputs = [];

    const _onSendPressed = () => {
        const emailError = Validate.email(email.value);

        if (emailError) {
            setEmail({...email, error: emailError});
            return;
        }

        AuthService.forgotPassword(email.value);

        setStep(1);
    };

    const _onChangePassword = async () => {

        const response = await AuthService.resetPassword(token.value, password.value, password2.value);

        if (response.success == false) {
            Alert.alert(
                'Error al restablecer contraseña',
                response.error ? response.error : 'Error al restablecer contraseña, reintentalo mas tarde',
                [{
                    text: 'OK', onPress: () => {}
                }]
            )
            return;
        }

        Alert.alert(
            'Contraseña restablecida con exito',
            'Contraseña restablecida con exito, ya puedes usar MedicAPP!',
            [
                { text: "OK", onPress: () => NavigationService.navigate('LoginScreen') }
            ],
            { cancelable: false }
        );

    }

    return (
        <ScrollContainer>
            <Background>

                <Header>Recuperar contraseña</Header>

                {step == 0 &&
                    <FirstStep
                        email={email}
                        setEmail={setEmail}
                        _onSendPressed={_onSendPressed}
                    />
                }

                {step == 1 &&
                    <SecondStep
                        inputs={inputs}
                        token={token}
                        setToken={setToken}
                        password={password}
                        setPassword={setPassword}
                        password2={password2}
                        setPassword2={setPassword2}
                        _onSend2Pressed={_onChangePassword}
                    />
                }

                <TouchableOpacity
                    style={styles.back}
                    onPress={() => NavigationService.navigate('LoginScreen')}
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
