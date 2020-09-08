import React, {memo, useEffect} from 'react';
import { PermissionsAndroid } from 'react-native';
import { NavigationService, SessionService } from '../services';
import LoadingState from "../components/LoadingStateFull";

const Init = () => {


    const _goTo = (dest: string) => {
        NavigationService.reset(dest);
    }

    const _isUserLoggedIn = async () => {
        const response = await SessionService.isUserLoggedIn();
        _goTo( response ? 'AuthNavigator' : 'NoAuthNavigator' )
    }

    const _requestGPSPermission = async () => {
        try {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        } catch (err) {
            console.log('Error al solicitar permisos gps: ', err)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            _isUserLoggedIn()
            _requestGPSPermission();
        }, 1000);
    })

    return <LoadingState />;
};

export default memo(Init);
