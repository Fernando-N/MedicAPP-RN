import React, {memo, useState} from 'react'
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native'
import Paragraph from "../../../../components/Paragraph";
import TextInput from "../../../../components/TextInput";
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'
import {Checkbox, Text} from "react-native-paper";
import {theme} from "../../../../core/theme";
import {Validate} from "../../../../utils/utils";
import {imagePicker} from "../../../../core/configuration";

type Props = {
    email: any,
    setEmail: any,
    inputs: any,
    password: any,
    setPassword: any,
    password2: any,
    setPassword2: any,
    setProfileImageB64: any,
    isParamedic: any,
    toggleIsParamedic: any
};

const ThirdStep = ({email, setEmail, inputs, password, setPassword, password2, setPassword2, setProfileImageB64, isParamedic, toggleIsParamedic}: Props) => {

    let actionSheetRef;

    const [iconName, setIconName] = useState('upload-to-cloud');

    const _handleEmailInput = (emailInput: string) => {
        setEmail({value: emailInput, error: Validate.email(emailInput)});
    }

    const _handlePasswordInput = (passwordInput: string) => {
        setPassword({value: passwordInput, error: Validate.password(password)})
    }

    const _handlePassword2Input = (passwordInput: string) => {
        setPassword2({value: passwordInput, error: Validate.password2(passwordInput, password.value)})
    }

    const _handleImagePicker = (index: number) => {
        switch (index) {
            case 0: {
                ImagePicker.openCamera(imagePicker.Options)
                    .then((image) => {
                        setIconName('check');
                        setProfileImageB64(image.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            }

            case 1: {
                ImagePicker.openPicker(imagePicker.Options)
                    .then((image) => {
                        setIconName('check');
                        setProfileImageB64(image.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            }

            default: {
                break;
            }
        }
    };

    return (
        <>

            <ActionSheet
                ref={o => actionSheetRef = o}
                title={'Selecciona imagen'}
                options={imagePicker.Buttons}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={(index) => _handleImagePicker(index)}
            />

            <View>

                <Paragraph>Cuentanos sobre ti...</Paragraph>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={_handleEmailInput}
                    error={email.error}
                    errorText={email.error}
                    textStyle={styles.input}
                    autoCapitalize="none"
                    onSubmitEditing={() => inputs['Contraseña'].focus()}
                />

                <TextInput
                    label="Contraseña"
                    reference={inputs}
                    returnKeyType="next"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={password.value}
                    onChangeText={_handlePasswordInput}
                    error={password.error}
                    errorText={password.error}
                    textStyle={styles.input}
                    onSubmitEditing={() => inputs['Confirmar contraseña'].focus()}
                />

                <TextInput
                    label="Confirmar contraseña"
                    reference={inputs}
                    returnKeyType="next"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={password2.value}
                    onChangeText={_handlePassword2Input}
                    error={password2.error}
                    errorText={password2.error}
                    textStyle={styles.input}
                    onSubmitEditing={() => {
                    }}
                />

                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => actionSheetRef.show()}>
                        <View style={{width: '100%', height: 50, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{flex: 1, marginLeft: 10}}>Imagen de perfil</Text>
                            <View style={{marginRight: 10}}>
                                <Entypo
                                    name={iconName}
                                    color={iconName == 'check' ? '#1fb317' : '#0e9ae6'}
                                    size={32}
                                    style={{}}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View
                    style={[styles.container, {width: '100%', height: 50, flexDirection: 'row', alignItems: 'center'}]}>
                    <Text style={{flex: 1, marginLeft: 10}}>¿Eres paramedico?</Text>
                    <View style={{marginRight: 10}}>
                        <Checkbox status={isParamedic ? 'checked' : 'unchecked'} onPress={toggleIsParamedic}/>
                    </View>
                </View>

            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
        backgroundColor: theme.colors.surface,
        borderRadius: 4,
        borderColor: '#000000',
        borderWidth: 0.4
    },
})

export default memo(ThirdStep);
