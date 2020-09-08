import React, { memo, useState } from 'react';
import { View, Alert } from 'react-native';
import {AuthService, NavigationService} from "../../services";
import FirstStep from "./components/steps/FirstStep";
import SecondStep from "./components/steps/SecondStep";
import StepIndicator from 'react-native-step-indicator';
import {ScrollView} from "react-native-gesture-handler";
import {Button} from "react-native-paper";
import ThirdStep from "./components/steps/ThirdStep";
import FourStep from "./components/steps/FourStep";
import {User} from "../../models";


const RegisterScreen = () => {

    // Datos usuarios en comun
    const [firstName, setFirstName] = useState({value: '', error: ''});
    const [lastName, setLastName] = useState({value: '', error: ''});
    const [rut, setRut] = useState({value: '', error: ''});
    const [dateOfBirth, setDateOfBirth] = useState({value: new Date(), error: ''});
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [password2, setPassword2] = useState({value: '', error: ''});
    const [isParamedic, setIsParamedic] = useState(false);
    const [nationality, setNationality] = useState('');
    const [region, setRegion] = useState('');
    const [commune, setCommune] = useState('');
    const [address, setAddress] = useState({value: '', error: ''});
    const [showAddress, setShowAddress] = useState(true);
    const [profileImageB64, setProfileImageB64] = useState('');

    // Datos paramedico
    const [aboutMe, setAboutMe] = useState(undefined);
    const [graduationYear, setGraduationYear] = useState('2020');
    const [certificateNationalHealth, setCertificateNationalHealth] = useState('');
    const [carnetImage, setCarnetImage] = useState('');
    const [titleImage, setTitleImage] = useState('');

    const [step, setStep] = useState(0);
    const [stepCount, setStepCount] = useState(3);

    let inputs = {};

    const _register = async () => {

        const user : User = {
            email: email.value,
            password: password.value,
            rut: rut.value,
            firstName: firstName.value,
            lastName: lastName.value,
            birthDay: dateOfBirth.value,
            commune: {
                value: commune
            },
            showAddress: showAddress,
            address: address.value,
            aboutMe: aboutMe,
            profileImage: profileImageB64,
            titleImage: titleImage,
            graduationYear: Number(graduationYear),
            certificateNationalHealth: certificateNationalHealth,
            carnetImage: carnetImage,
            paramedic: isParamedic,
        };

        if (!isParamedic) {
            user.aboutMe = undefined;
            user.graduationYear = undefined;
            user.certificateNationalHealth = undefined;
            user.titleImage = undefined;
            user.carnetImage = undefined;
        }

        const response = await AuthService.register(user);

        if (response.success == false) {
            Alert.alert(
                'Error al registrar',
                response.error ? response.error : 'Error al realizar el registro, reintentalo mas tarde',
                [{
                    text: 'OK', onPress: () => {}
                }]
            )
            return;
        }

        Alert.alert(
            'Registrado con exito',
            isParamedic ?
                'Tu registro debe ser aprobado por un administrador de MedicAPP, te notificaremos cuando esto ocurra' :
                'Registrado con exito, ya puedes usar MedicAPP!',
            [
                { text: "OK", onPress: () => NavigationService.navigate('LoginScreen') }
            ],
            { cancelable: false }
        );

    };

    const _previousStep = () => {
        if (step < 4 && step != 0) {
            setStep(step - 1);
        }
    }

    const _nextStep = async () => {
        if ((step == 0 && (firstName.error != '' || lastName.error != '' || rut.error != '')) || (step == 1 && (address.error != ''))) {
            Alert.alert('Error', 'Verifica los datos ingresados.')
            return;
        }

        if (step < 2) {
            setStep(step + 1);
        } else if (step == 2 && !isParamedic) {
            await _register();
        } else if (step == 2 && isParamedic) {
            setStep(step + 1);
        } else if (step == 3) {
            await _register();
        }
    }

    const _toggleIsParamedic = () => {
        if (isParamedic) {
            setStepCount(3)
        } else {
            setStepCount(4)
        }
        setIsParamedic(!isParamedic);

    }

    return (
        <View>
            <ScrollView>

                <View style={{marginTop: 15, marginBottom: 15}}>
                    <StepIndicator
                        customStyles={stepsStyles}
                        currentPosition={step}
                        stepCount={stepCount}
                    />
                </View>

                <View style={{paddingHorizontal: 15}}>
                    { step==0 && <FirstStep
                        name={firstName}
                        setName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        dateOfBirth={dateOfBirth}
                        inputs={inputs}
                        rut={rut}
                        setDateOfBirth={setDateOfBirth}
                        setRut={setRut}
                    />}

                    { step==1 && <SecondStep
                        inputs={inputs}
                        address={address}
                        setAddress={setAddress}
                        region={region}
                        setRegion={setRegion}
                        commune={commune}
                        setCommune={setCommune}
                        nationality={nationality}
                        setNationality={setNationality}
                        showAddress={showAddress}
                        setShowAddress={setShowAddress}
                    />}

                    { step==2 && <ThirdStep
                        inputs={inputs}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        password2={password2}
                        setPassword2={setPassword2}
                        setProfileImageB64={setProfileImageB64}
                        isParamedic={isParamedic}
                        toggleIsParamedic={_toggleIsParamedic}
                    />}

                    { step == 3 && <FourStep
                        aboutMe={aboutMe}
                        setAboutMe={setAboutMe}
                        graduationYear={graduationYear}
                        setGraduationYear={setGraduationYear}
                        setCertificateNationalHealth={setCertificateNationalHealth}
                        setCarnetImage={setCarnetImage}
                        setTitleImage={setTitleImage}
                    />}

                    <View style={[{flexDirection: 'row'}]}>
                        <Button style={{flex: 1}} onPress={() => _previousStep()}>Anterior</Button>
                        <Button style={{flex: 1}} onPress={() => _nextStep()}>{((!isParamedic && step == 2) || (isParamedic && step == 3)) ? 'Registrarme' : 'Siguiente'}</Button>
                    </View>

                </View>

            </ScrollView>
        </View>
    );
};

const stepsStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize:30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#1fb317',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#1fb317',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#1fb317',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#1fb317',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#1fb317',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#1fb317'
}

export default memo(RegisterScreen);
