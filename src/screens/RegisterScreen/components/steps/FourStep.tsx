import React, {memo, useEffect, useState} from 'react'
import { StyleSheet, View} from 'react-native'
import Paragraph from "../../../../components/Paragraph";
import TextInput from "../../../../components/TextInput";
import Entypo from 'react-native-vector-icons/Entypo';
import {Text} from "react-native-paper";
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'
import {theme} from "../../../../core/theme";
import {Picker} from "@react-native-community/picker";
import {imagePicker} from "../../../../core/configuration";
import ImagePicker from "react-native-image-crop-picker";

type Props = {
    aboutMe: any,
    setAboutMe: any,
    setTitleImage: any,
    graduationYear: any,
    setGraduationYear: any,
    setCertificateNationalHealth: any,
    setCarnetImage: any
};

const FourStep = ({aboutMe, setAboutMe, setTitleImage, graduationYear, setGraduationYear,
                      setCertificateNationalHealth, setCarnetImage}: Props) => {

    const [iconName, setIconName] = useState('upload-to-cloud');
    const [iconName2, setIconName2] = useState('upload-to-cloud');
    const [iconName3, setIconName3] = useState('upload-to-cloud');
    const [years, setYears] = useState([]);

    const [imageSelected, setImageSelected] = useState(undefined);

    let actionSheetRef;

    const graduationYears = () => {
        for (let x = 2020; x >= 1950; x--) {
            console.log(x)
            setYears(oldArray => [...oldArray, <Picker.Item key={x} value={x} label={x.toString()} />])
        }
    }

    const _handleOpenActionSheet = (type: string) => {
        setImageSelected(type)
        actionSheetRef.show();
    }

    const _handleImagePicked = (image) => {
        console.log(imageSelected)
        if (imageSelected === 'carnetImage') {
            setIconName('check')
            setCarnetImage(image.data);
        }else if (imageSelected === 'certificateNationalHealth') {
            setIconName2('check');
            setCertificateNationalHealth(image.data);
        }else if (imageSelected === 'titleImage') {
            setIconName3('check');
            setTitleImage(image.data);
        }
    }

    const _handleImagePicker = (index: number) => {
        switch (index) {
            case 0: {
                ImagePicker.openCamera(imagePicker.Options)
                    .then((image) => _handleImagePicked(image))
                    .catch((error) => {
                        console.log(error);
                    });
                break;
            }

            case 1: {
                ImagePicker.openPicker(imagePicker.Options)
                    .then((image) => _handleImagePicked(image))
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

    useEffect(() => {
        graduationYears();
    }, [])

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
                label="Sobre ti"
                returnKeyType="next"
                multiline={true}
                value={aboutMe}
                onChangeText={text => setAboutMe(text)}
                textStyle={styles.input}
            />

            <View style={styles.container}>
                <Picker selectedValue={graduationYear} onValueChange={(value) => setGraduationYear(value)}>
                    <Picker.Item value={undefined} label='-- Selecciona tu año de graduación --'/>
                    {years}
                </Picker>
            </View>

            <View style={[styles.container, {width: '100%', height: 50, flexDirection: 'row', alignItems: 'center'}]}>
                <Text style={{flex: 1, marginLeft: 10}}>Imagen de carnet</Text>
                <View style={{marginRight: 10}}>
                    <Entypo
                        name={iconName}
                        color={iconName == 'check' ? '#1fb317' : '#0e9ae6'}
                        size={32}
                        style={{}}
                        onPress={() => _handleOpenActionSheet('carnetImage')}
                    />
                </View>
            </View>

            <View style={[styles.container, {width: '100%', height: 50, flexDirection: 'row', alignItems: 'center'}]}>
                <Text style={{flex: 1, marginLeft: 10}}>Imagen de certificado prestador de salud</Text>
                <View style={{marginRight: 10}}>
                    <Entypo
                        name={iconName2}
                        color={iconName2 == 'check' ? '#1fb317' : '#0e9ae6'}
                        size={32}
                        style={{}}
                        onPress={() => _handleOpenActionSheet('certificateNationalHealth')}
                    />
                </View>
            </View>

            <View style={[styles.container, {width: '100%', height: 50, flexDirection: 'row', alignItems: 'center'}]}>
                <Text style={{flex: 1, marginLeft: 10}}>Imagen de titulo universitario/tecnico</Text>
                <View style={{marginRight: 10}}>
                    <Entypo
                        name={iconName3}
                        color={iconName3 == 'check' ? '#1fb317' : '#0e9ae6'}
                        size={32}
                        style={{}}
                        onPress={() => _handleOpenActionSheet('titleImage')}
                    />
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

export default memo(FourStep);
