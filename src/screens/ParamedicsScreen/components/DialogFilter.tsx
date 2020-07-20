import React, {memo, useEffect, useState} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import {Navigation} from '../../../models/';
import Rating from "../../../components/Rating";
import {Button, Card, Dialog, TouchableRipple} from "react-native-paper";
import {FlatList} from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import {UtilService} from "../../../clients/util/UtilService";

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
        UtilService.getCommunes(value, setCommunes);
    }

    const _clearFilters = () => {
        setRegion(undefined);
        setCommune(undefined);
        setIsModalVisible(false);
        getAllParamedics();
    }

    useEffect(() => {
        UtilService.getRegions(setRegions);
    }, [])

    return (
        <Dialog
            visible={isModalVisible}
            onDismiss={() => setIsModalVisible(false)}>

            <Dialog.Title>Filtros de busqueda</Dialog.Title>

            <Dialog.Content>

                <RNPickerSelect
                    placeholder={{
                        label: 'Selecciona tu región...',
                        value: null,
                        color: '#9EA0A4',
                    }}
                    onValueChange={(value) => _handleRegionSelect(value)}
                    items={regions}
                />

                <RNPickerSelect
                    placeholder={{
                        label: 'Selecciona tu comuna...',
                        value: null,
                        color: '#9EA0A4',
                    }}
                    onValueChange={setCommune}
                    items={communes}
                />

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
