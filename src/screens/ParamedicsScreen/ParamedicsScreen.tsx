import React, {memo, useEffect, useState} from 'react';
import {View} from 'react-native';
import AppBarHeader from "../../components/AppBarHeader";
import LoadingState from "../../components/LoadingState";
import {LocationService, ParamedicService, SessionService} from '../../services';
import ParamedicList from "./components/ParamedicsList";
import DialogFilter from "./components/DialogFilter";

navigator.geolocation = require('@react-native-community/geolocation');

type Props = {
    route: any;
};

const ParamedicsScreen = ({route}: Props) => {

    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [region, setRegion] = useState(undefined);
    const [commune, setCommune] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(false);
    const [page, setPage] = useState(1);
    const [currentLocation, setCurrentLocation] = useState({});

    const _getAllParamedics = async () => {
        setIsLoading2(true);

        const loc = await _setCurrentLocation();

        let response;

        if (!currentLocation && loc.communeId != undefined) {
            response = await ParamedicService.getAllByCommune(loc.communeId, page)
            setRegion(loc.regionId)
            setCommune(loc.communeId)
            setCurrentLocation(loc);
        }else if (commune != undefined) {
            response = await ParamedicService.getAllByCommune(commune, page)
        } else if (region != undefined) {
            response = await ParamedicService.getAllByRegion(region, page);
        } else {
            response = await ParamedicService.getAll(page);
        }

        setData(response.data);
        setIsLoading(false);
        setIsLoading2(false);
    }

    const _handleFilterApply = async () => {
        setPage(1);
        _getAllParamedics();
        setIsModalVisible(false);
    }

    const _setCurrentLocation = async () => {
        if (currentLocation==true) return undefined;
        return await LocationService.getCurrentLocation();
    }

    useEffect( () => {
        _getAllParamedics();
    }, [])

    return (
        <>
            <View style={{flex: 1}}>
                <LoadingState isLoading={isLoading} />
                <AppBarHeader
                    previous={true}
                    title={'Paramedicos'}
                    search={true}
                    setIsDialogVisible={setIsModalVisible}
                />

                <ParamedicList
                    data={data}
                    loading={isLoading2}
                    getParamedics={_getAllParamedics}
                    page={page}
                    setPage={setPage}
                />

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

