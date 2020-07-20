import React, {memo, useEffect, useRef, useState} from 'react';
import {Navigation, LatLong} from "../../models/";
import AppBarHeader from "../../components/AppBarHeader";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {UtilService} from "../../clients/util/UtilService";

type Props = {
    navigation: Navigation,
    route: any
};

const MapsScreen = ({navigation, route}: Props) => {
    const mapRef = useRef(null);

    const [marker, setMarker] = useState({latitude: 0, longitude: 0});

    const _getLatLong = async () => {
        const response = await UtilService.getLogitudeAndLatitude(`${route.params.address}, ${route.params.commune}`);
        setMarker({
            latitude: response.data.latitude,
            longitude: response.data.longitude
        });
    };

    useEffect(() => {

        _getLatLong();


        setTimeout(() => {

            if (mapRef) {
                mapRef.current.fitToSuppliedMarkers(['casa'],{ edgePadding:
                        {top: 50,
                            right: 50,
                            bottom: 50,
                            left: 50}

                })
            }}, 3000)

    }, []);

    return (
        <>
        <AppBarHeader navigation={navigation} title={`Ubicación de ${route.params.name}`} previous={true} />
            <MapView
                ref={mapRef}
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -38.744504,
                    longitude: -72.576233,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421}}
            >
                <Marker
                    key={Date.now()}
                    identifier={'casa'}
                    coordinate={marker}
                    title={'Dirección'}
                    description={`Ubicación de ${route.params.name}`}
                />

            </MapView>
        </>
    );
};

export default memo(MapsScreen);
