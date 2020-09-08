import React, {memo, useEffect, useState} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import AppBarHeader from "../../components/AppBarHeader";
import {ProfileService} from "../../services/profile/ProfileService";
import Stats from "./components/Stats";
import Header from "./components/Header";
import About from "./components/About";
import Location from "./components/Location";
import {othersMenu, ownMenu} from "./menus";
import {NavigationService, ParamedicService, SessionService} from "../../services";
import LoadingState from "../../components/LoadingState";

type Props = {
    route: any;
};

const ProfileScreen = ({route}: Props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({commune: {}, region: {}});
    const [stats, setStats] = useState({valuations: 0, contacts: 0, rating: 0});
    const [isMyProfile, setIsMyProfile] = useState(false);

    const _getProfile = async () => {
        const response = await ProfileService.getProfile(route.params.userId);
        setData(response.data);

        const userId = await SessionService.getClaim('USER_ID');
        if (userId === response.data.key) setIsMyProfile(true);

        if (response.data.paramedic) {
            console.log('obteniendo stats')
            _getStats();
        }

        setIsLoading(false);
    }

    const ownMenuFunctions = [
        {
            onPress: () => NavigationService.navigate('EditProfileScreen')
        }
    ]

    const othersMenuFunctions = [
        {
            onPress: () => NavigationService.navigate('ReportProfileScreen', {
                name: `${data.firstName} ${data.lastName}`,
                userId: route.params.userId
            })
        }
    ]

    const _getStats = async () => {
        const response = await ParamedicService.getStatsOfUserId(route.params.userId);

        if (response.error) {
            setStats({rating: 0, contacts: 0, valuations: 0})
            return;
        }

        setStats(response.data);
    }

    const _goToMaps = () => {
        if (data.showAddress) {
            NavigationService.navigate('MapsScreen', {
                name: `${data.firstName} ${data.lastName}`,
                address: data.address,
                commune: data.commune.label,
                region: data.region.label
            });
        }
    }

    const _goToFeedback = () => {
        NavigationService.navigate('FeedbacksScreen', {
            name: `${data.firstName} ${data.lastName}`,
            userId: route.params.userId
        });
    }

    useEffect(() => {
        _getProfile();
    }, [])

    return (
        <>
            <AppBarHeader
                previous={true}
                title={`Perfil de ${data.firstName} ${data.lastName}`}
                showDots={false}
                menu={isMyProfile ? ownMenu : othersMenu}
                menuFunctions={isMyProfile ? ownMenuFunctions : othersMenuFunctions}
            />

            <LoadingState isLoading={isLoading} />

            <ScrollView style={styles.container}>

                <Header
                    user={data}
                    onPressRating={_goToFeedback}
                    isMyProfile={isMyProfile}
                    isParamedic={data.paramedic}
                    stars={stats.rating}
                />

                {data.paramedic && <Stats stats={stats} />}

                {data.aboutMe && <About aboutMe={data.aboutMe}/> }

                <Location location={{
                    showAddress: data.showAddress,
                    address: data.address,
                    commune: data.commune.label,
                    region: data.region.label
                }} onPress={_goToMaps} />

            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
})

export default memo(ProfileScreen);
