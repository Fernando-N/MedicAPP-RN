import React, {memo, useState, useEffect} from 'react';
import Button from '../../components/Button';
import AppBarHeader from "../../components/AppBarHeader";
import {AuthService, LocationService, NavigationService, SessionService} from "../../services";
import Menu from "./components/Menu";
import Header from "./components/Header";
import LoadingState from "../../components/LoadingState";


const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);

    const _getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                console.log(pos.coords)
                const response = await LocationService.getCommuneFromLatitudeAndLongitude({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                LocationService.setCurrentLocation(response.data);
                setIsLoading(false);
            },
            (error) => {
                console.log('Error obteniendo ubicacion', error.message);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        _getCurrentLocation();
    }, []);

    const _onLogoutPress = async () => {
        await AuthService.logout();
        NavigationService.navigate('Init');
    }

    return (
        <>
        <AppBarHeader title={'Dashboard'} />
        <LoadingState isLoading={isLoading} />
        <Header />
        <Menu />
        <Button mode="outlined" onPress={_onLogoutPress}>
        Logout
        </Button>
        </>
    );
};

export default memo(Dashboard);
