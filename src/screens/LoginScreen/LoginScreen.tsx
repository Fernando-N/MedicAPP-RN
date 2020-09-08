import React, {memo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import ScrollContainer from '../../components/ScrollContainer';
import {theme} from '../../core/theme';
import {AuthService, NavigationService} from '../../services';
import {Validate} from '../../utils/utils';

const LoginScreen = () => {
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [buttonDisabled, setButtonDisabled] = useState(false);
    let inputs = {};

    const _onLoginPressed = async () => {
        setButtonDisabled(true);
        const emailError = Validate.email(email.value);

        if (emailError) {
            setEmail({...email, error: emailError});
            setButtonDisabled(false);
            return;
        }

        const authResponse = await AuthService.login(email.value, password.value);

        setButtonDisabled(false);

        if (!authResponse.success) {
            Alert.alert('Error de autenticación', authResponse.error);
            return;
        }

        NavigationService.reset('AuthNavigator');
    };

    return (
        <ScrollContainer>
            <Background>
                <Logo/>

                <Header>Bienvenido de nuevo</Header>

                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={text => setEmail({value: text, error: ''})}
                    error={email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    onSubmitEditing={() => inputs['Contraseña'].focus()}
                />

                <TextInput
                    label="Contraseña"
                    reference={inputs}
                    returnKeyType="done"
                    autoCapitalize="none"
                    value={password.value}
                    onChangeText={text => setPassword({value: text, error: ''})}
                    error={password.error}
                    errorText={password.error}
                    secureTextEntry
                />

                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => NavigationService.navigate('ForgotPasswordScreen')}
                    >
                        <Text style={styles.label}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>

                <Button disabled={buttonDisabled} loading={buttonDisabled} mode="contained" onPress={_onLoginPressed}>
                    Ingresar
                </Button>

                <View style={styles.row}>
                    <Text style={styles.label}>¿Aún no tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => NavigationService.navigate('RegisterScreen')}>
                        <Text style={styles.link}>Registrate</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </ScrollContainer>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default memo(LoginScreen);
