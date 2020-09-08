import React, {useState, useEffect, memo} from 'react';
import AppBarHeader from "../../components/AppBarHeader";
import {LocationService} from '../../services';
import HospitalsList from "./components/HospitalsList";

const HospitalsScreen = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const _getHospitals = async () => {

        const location = await LocationService.getCurrentLocation();

        console.log(location)

        const response = await LocationService.getHospitals({latitude: location.latitude, longitude: location.longitude});

        console.log(response.data)

        setData(response.data);
        setLoading(false)
    };

    useEffect(() => {
        _getHospitals();
    }, []);

    return (

        <>
            <AppBarHeader previous={true} title={'Hospitales'}/>
            <HospitalsList
                data={data}
                getHospitals={_getHospitals}
                loading={loading}
                page={page}
                setPage={setPage}
            />
        </>
    )

};

export default memo(HospitalsScreen);
