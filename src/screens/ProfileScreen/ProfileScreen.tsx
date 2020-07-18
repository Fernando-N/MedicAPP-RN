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

type Props = {
    route: any;
    navigation: Navigation;
};

const ProfileScreen = ({navigation, route}: Props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(undefined);
    const [isMyProfile, setIsMyProfile] = useState(false);

    const _getProfile = async () => {
        const response = await ProfileService.getProfile(route.params.userId);
        setData(response.data);

        const userId = await AuthService.getUserId();
        if (userId === response.data.key) setIsMyProfile(true);

        setIsLoading(false);
    }

    useEffect(() => {
        _getProfile();
    }, [])

    if (isLoading) return <LoadingState/>;

    const menuItems = [
        {
            icon: 'icon',
            title: 'Test',
            onPress: () => {console.log('works!')}
        },
        {
            icon: 'edit',
            title: 'Funciona2',
            onPress: () => {console.log('Works2!')}
        }
    ]

    return (
        <>
            <AppBarHeader navigation={navigation} previous={true} title={`Perfil de ${data.firstName} ${data.lastName}`}
                          showDots={true}
                          menu={menuItems}
            />
            <ScrollView style={styles.container}>
                <Header user={data} isMyProfile={isMyProfile} navigation={navigation} />
                <Stats />
                {data.aboutMe && <About aboutMe={data.aboutMe}/> }
                <Location location={{
                    showAddress: true,
                    address: data.address,
                    commune: data.commune.label,
                    region: data.region.label
                }} />
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
