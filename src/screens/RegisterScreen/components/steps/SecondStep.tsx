import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Paragraph from "../../../../components/Paragraph";
import TextInput from "../../../../components/TextInput";
import { Picker } from "@react-native-community/picker";
import { LocationService } from "../../../../services";
import {theme} from "../../../../core/theme";
import {Text, Checkbox} from "react-native-paper";
import {Validate} from "../../../../utils/utils";


type Props = {
    nationality,
    setNationality,
    region,
    setRegion,
    commune,
    setCommune,
    address,
    setAddress,
    showAddress,
    setShowAddress,
    inputs
};

const FirstStep = ({nationality, setNationality, region, setRegion, commune, setCommune, address, setAddress, showAddress, setShowAddress, inputs}: Props) => {

    const [nationalities, setNationalities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    const getNationality = () => {
        LocationService.getNationalities(setNationalities);
    }

    const getRegions = () => {
        LocationService.getRegions(setRegions);
    }

    const _handleAddressInput = (addressInput: string) => {
        setAddress({value: addressInput, error: Validate.address(addressInput)});
    }

    const _handleRegionSelect = (regionId: string) => {
        setRegion(regionId);
        LocationService.getCommunes(regionId, setCommunes);
    };

    const nationalitiesPickerRender = nationalities.map((value, index) => (
        <Picker.Item key={index} value={value.value} label={value.label}/>
    ));

    const regionPickerRender = regions.map((value, index) => (
        <Picker.Item key={index} value={value.value} label={value.label}/>
    ));

    const communePickerRender = communes.map((value, index) => (
        <Picker.Item key={index} value={value.value} label={value.label}/>
    ));

    useEffect(() => {
        getNationality();
        getRegions();
    }, [])

    return (
        <View>
            <Paragraph>Cuentanos sobre ti...</Paragraph>

            <View style={styles.container}>
                <Picker selectedValue={nationality} onValueChange={(value) => setNationality(value)}>
                    <Picker.Item value={undefined} label='-- Selecciona una nacionalidad --'/>
                    {nationalitiesPickerRender}
                </Picker>
            </View>

            <View style={styles.container}>
                <Picker selectedValue={region} onValueChange={(value) => _handleRegionSelect(value)}>
                    <Picker.Item value={undefined} label='-- Selecciona una región --'/>
                    {regionPickerRender}
                </Picker>
            </View>

            <View style={styles.container}>
                <Picker selectedValue={commune} onValueChange={(value) => setCommune(value)}>
                    <Picker.Item value={undefined} label='-- Selecciona una comuna --'/>
                    {communePickerRender}
                </Picker>
            </View>

            <TextInput
                label="Dirección"
                reference={inputs}
                returnKeyType="next"
                value={address.value}
                onChangeText={_handleAddressInput}
                textStyle={styles.input}
                error={address.error}
                errorText={address.error}
                autoCapitalize="words"
            />

            <View style={[styles.container, {width: '100%', height: 50, flexDirection: 'row', alignItems: 'center'}]}>
                <Text style={{flex: 1, marginLeft: 10}}>¿Deseas mostrar tu dirección?</Text>
                <View style={{marginRight: 10}}>
                    <Checkbox
                        status={showAddress ? 'checked' : 'unchecked'}
                        onPress={() => setShowAddress(!showAddress)}
                    />
                </View>
            </View>

        </View>
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
    cardView: {
        flexDirection: 'row',
        padding: 6,
    },
    text: {
        fontSize: 18,
    }
})

export default memo(FirstStep);
