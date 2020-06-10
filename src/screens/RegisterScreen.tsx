import React, {memo, useState} from 'react';
import {StyleSheet, Text, View, Alert, Keyboard} from 'react-native';
import Background from "../components/Background";
import Checkbox from '../components/Switch';
import TextInput from '../components/TextInput';
import ScrollContainer from '../components/ScrollContainer';
import DateTimePicker from '../components/DateTimePicker';
import {theme} from '../core/theme';
import {Navigation} from '../types';
import {Validate} from '../core/utils';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Paragraph from "../components/Paragraph";

type Props = {
    navigation: Navigation;
};

const RegisterScreen = ({navigation}: Props) => {
    const [name, setName] = useState({value: '', error: ''});
    const [lastName, setLastName] = useState({value: '', error: ''});
    const [rut, setRut] = useState({value: '', error: ''});
    const [dateOfBirth, setDateOfBirth] = useState({value: new Date(), error: ''});
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [isParamedic, setParamedic] = useState(false);
    let inputs = {};

    const _handleRutInput = (rutInput: string) => Validate.rut(rutInput, setRut);

    const _onSignUpPressed = () => {
        const nameError = Validate.name(name.value);
        const emailError = Validate.email(email.value);
        const passwordError = Validate.password(password.value);


        if (emailError || passwordError || nameError) {
            setName({...name, error: nameError});
            setEmail({...email, error: emailError});
            setPassword({...password, error: passwordError});
            return;
        }

        navigation.navigate('Dashboard');
    };

    const progressStepsProperties = {
        topOffset: -10,
        marginBottom: 0
    };

    const progressStepDefaultProps = {
        nextBtnText: 'Siguiente',
        previousBtnText: 'Volver',
        finishBtnText: 'Enviar'
    };

    const _handleDatePickerConfirm = (date) => {
        _toggleDatePickerVisibility();
        setDateOfBirth({value: date, error: ''});
    };

    const _toggleDatePickerVisibility = () => {
        setDatePickerVisible(!isDatePickerVisible);
        Keyboard.dismiss();
    };

    const _handleDatePicker = () => {
        Keyboard.dismiss();
    }

    return (
        <ScrollContainer>
            <Background>
                <View>
                    <ProgressSteps {...progressStepsProperties}>

                        <ProgressStep scrollable={false} label="Antecedentes Personales" {...progressStepDefaultProps} errors>
                                <Paragraph>Cuentanos sobre ti...</Paragraph>
                                <TextInput
                                    label="Nombre"
                                    returnKeyType="next"
                                    value={name.value}
                                    onChangeText={text => setName({value: text, error: ''})}
                                    error={name.error}
                                    errorText={name.error}
                                    textStyle={styles.input}
                                    onSubmitEditing={() => inputs['Apellidos'].focus()}
                                />

                                <TextInput
                                    label="Apellidos"
                                    reference={inputs}
                                    returnKeyType="next"
                                    value={lastName.value}
                                    onChangeText={text => setLastName(...lastName, {value: text, error: ''})}
                                    error={lastName.error}
                                    errorText={lastName.error}
                                    textStyle={styles.input}
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

                        </ProgressStep>

                        <ProgressStep label="Ubicación" {...progressStepDefaultProps}>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 2!</Text>
                            </View>
                        </ProgressStep>

                        <ProgressStep onNext={() => {
                            if (!isParamedic) {
                                Alert.alert('No eres paramedico!');
                            }
                        }} label="Perfil" {...progressStepDefaultProps} errors={!isParamedic}>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 3!</Text>
                                <Checkbox
                                    value={isParamedic}
                                    onValueChange={() => setParamedic(!isParamedic)}
                                />
                            </View>
                        </ProgressStep>

                        <ProgressStep label="Antecedentes profesionales" {...progressStepDefaultProps}>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 4!</Text>
                            </View>
                        </ProgressStep>


                    </ProgressSteps>
                </View>



                {/*<TextInput*/}
                {/*    label="Email"*/}
                {/*    returnKeyType="next"*/}
                {/*    value={email.value}*/}
                {/*    onChangeText={text => setEmail({value: text, error: ''})}*/}
                {/*    error={email.error}*/}
                {/*    errorText={email.error}*/}
                {/*    autoCapitalize="none"*/}
                {/*    autoCompleteType="email"*/}
                {/*    textContentType="emailAddress"*/}
                {/*    keyboardType="email-address"*/}
                {/*    textStyle={styles.input}*/}
                {/*/>*/}

                {/*<TextInput*/}
                {/*    label="Contraseña"*/}
                {/*    returnKeyType="done"*/}
                {/*    value={password.value}*/}
                {/*    onChangeText={text => setPassword({value: text, error: ''})}*/}
                {/*    error={password.error}*/}
                {/*    errorText={password.error}*/}
                {/*    secureTextEntry*/}
                {/*    textStyle={styles.input}*/}
                {/*/>*/}

                {/*<Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>*/}
                {/*    Registrarme*/}
                {/*</Button>*/}

                {/*<View style={styles.row}>*/}
                {/*    <Text style={styles.label}>¿Ya tienes cuenta? </Text>*/}
                {/*    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>*/}
                {/*        <Text style={styles.link}>Ingresar</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </Background>
        </ScrollContainer>
    );
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
        maxWidth: '85%',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 25,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    input: {
        marginHorizontal: 25,
    }
});

export default memo(RegisterScreen);
