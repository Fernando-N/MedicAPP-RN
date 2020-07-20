import React, {memo, useEffect, useState} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import {Navigation} from '../../models/';
import AppBarHeader from "../../components/AppBarHeader";
import LoadingState from "../../components/LoadingState";
import {ProfileService} from "../../clients/profile/ProfileService";
import {AuthService} from "../../clients/auth/AuthService";
import Stats from "./components/Stats";
import Header from "./components/Header";
import About from "./components/About";
import Location from "./components/Location";
import {ParamedicService} from "../../clients/paramedic/ParamedicService";
import {othersMenu, ownMenu} from "./menus";

type Props = {
    route: any;
    navigation: Navigation;
};

const ProfileScreen = ({navigation, route}: Props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(undefined);
    const [stats, setStats] = useState({valuations: 0, contacts: 0, rating: 0});
    const [isMyProfile, setIsMyProfile] = useState(false);

    const _getProfile = async () => {
        const response = await ProfileService.getProfile(route.params.userId);
        setData(response.data);

        const userId = await AuthService.getUserId();
        if (userId === response.data.key) setIsMyProfile(true);

        setIsLoading(false);
    }

    const ownMenuFunctions = [
        {
            onPress: () => navigation.navigate('EditProfileScreen')
        }
    ]

    const othersMenuFunctions = [
        {
            onPress: () => navigation.navigate('ReportProfileScreen', {
                name: `${data.firstName} ${data.lastName}`,
                userId: route.params.userId
            })
        }
    ]

    const _getStats = async () => {
        const response = await ParamedicService.getStats(route.params.userId);

        if (response.error) {
            setStats({rating: 0, contacts: 0, valuations: 0})
            return;
        }

        setStats(response.data);
    }

    const _goToMaps = () => {
        if (data.showAddress) {
            navigation.navigate('MapsScreen', {
                name: `${data.firstName} ${data.lastName}`,
                address: data.address,
                commune: data.commune.label,
                region: data.region.label
            });
        }
    }

    const _goToFeedback = () => {
        navigation.navigate('FeedbacksScreen', {
            name: `${data.firstName} ${data.lastName}`,
            userId: route.params.userId
        });
    }

    useEffect(() => {
        _getProfile();
        setTimeout(() => {
            _getStats();
        }, 100)

    }, [])

    if (isLoading) return <LoadingState/>;

    return (
        <>
            <AppBarHeader
                navigation={navigation}
                previous={true}
                title={`Perfil de ${data.firstName} ${data.lastName}`}
                showDots={true}
                menu={isMyProfile ? ownMenu : othersMenu}
                menuFunctions={isMyProfile ? ownMenuFunctions : othersMenuFunctions}
            />

            <ScrollView style={styles.container}>

                <Header
                    user={data}
                    onPressRating={_goToFeedback}
                    isMyProfile={isMyProfile}
                    isParamedic={data.paramedic}
                    stars={stats.rating}
                    navigation={navigation} />

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
