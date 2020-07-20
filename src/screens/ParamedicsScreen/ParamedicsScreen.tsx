import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Navigation} from '../../models/';
import AppBarHeader from "../../components/AppBarHeader";
import LoadingState from "../../components/LoadingState";
import {ParamedicService} from '../../clients/paramedic/ParamedicService';
import ParamedicCardView from "./components/ParamedicsList";
import DialogFilter from "./components/DialogFilter";

type Props = {
    navigation: Navigation;
};

const ParamedicsScreen = ({navigation}: Props) => {

    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [region, setRegion] = useState(undefined);
    const [commune, setCommune] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const _getAllParamedics = async () => {
        const response = await ParamedicService.getAll();
        setData(response.data);
        setIsLoading(false)
    }

    const _handleFilterApply = async () => {
        let response;

        if (commune != undefined) {
            response = await ParamedicService.getAllByCommune(commune)
        } else if (region != undefined) {
            response = await ParamedicService.getAllByRegion(region);
        } else {
            return;
        }

        setData(response.data);
    }

    useEffect(() => {
        _getAllParamedics();
    }, [])

    if (isLoading) return <LoadingState />;

    return (
        <>
            <View style={{flex: 1}}>
                <AppBarHeader
                    navigation={navigation}
                    previous={true}
                    title={'Paramedicos'}
                    search={true}
                    setIsDialogVisible={setIsModalVisible}
                />
                <ParamedicCardView navigation={navigation} data={data} />
                <DialogFilter
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    commune={commune}
                    setCommune={setCommune}
                    region={region}
                    setRegion={setRegion}
                    handleFilterApply={_handleFilterApply}
                    getAllParamedics={_getAllParamedics}
                />
            </View>
        </>
    );
};

export default memo(ParamedicsScreen);

