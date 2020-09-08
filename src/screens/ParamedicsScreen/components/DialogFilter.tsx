import React, {memo, useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import { Button, Dialog } from "react-native-paper";
import { LocationService } from "../../../services";
import { Picker } from '@react-native-community/picker';

type Props = {
    region: string,
    commune: string,
    setRegion: any,
    setCommune: any,
    setIsModalVisible: any,
    isModalVisible: any,
    handleFilterApply: any,
    getAllParamedics: any
};

const DialogFilter = ({commune, setCommune, region, setRegion, setIsModalVisible, isModalVisible, handleFilterApply, getAllParamedics}: Props) => {

    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);


    const _handleRegionSelect = (value) => {
        setRegion(value);
        LocationService.getCommunes(value, setCommunes);
    }

    const _clearFilters = () => {
        setRegion(undefined);
        setCommune(undefined);
        setIsModalVisible(false);
        getAllParamedics();
    }

    const regionPickerRender = regions.map((value, index) => (
            <Picker.Item key={index} value={value.value} label={value.label} />
    ));

    const communePickerRender = communes.map((value, index) => (
        <Picker.Item key={index} value={value.value} label={value.label} />
    ));

    useEffect(() => {
        LocationService.getRegions(setRegions);
    }, []);

    return (
        <Dialog
            visible={isModalVisible}
            onDismiss={() => setIsModalVisible(false)}>

            <Dialog.Title>Filtros de busqueda</Dialog.Title>

            <Dialog.Content>

                <Picker selectedValue={region} onValueChange={(value) => _handleRegionSelect(value)} >
                    <Picker.Item value={undefined} label='-- Selecciona una región --' />
                    {regionPickerRender}
                </Picker>

                <Picker selectedValue={commune} onValueChange={(value) => setCommune(value)} >
                    <Picker.Item value={undefined} label='-- Selecciona una comuna --' />
                    {communePickerRender}
                </Picker>


            </Dialog.Content>

            <Dialog.Actions>
                <Button key={'aplicar'} onPress={handleFilterApply}>APLICAR FILTROS</Button>
                {(region || commune) &&
                <Button key={'cancelar'} onPress={_clearFilters}>LIMPIAR FILTROS</Button>
                }
            </Dialog.Actions>
        </Dialog>
    )
};

const colors = {
    darkBg: "#222",
    pink: "#0e9ae6",
    orange: "#0edde6",
    text: "#fff",
}

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

export default memo(DialogFilter);
