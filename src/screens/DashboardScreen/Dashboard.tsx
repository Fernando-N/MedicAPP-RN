import React, {memo, useState, useEffect} from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import {Navigation} from "../../models/";
import {AuthService} from '../../clients/auth/AuthService';
import AppBarHeader from "../../components/AppBarHeader";

type Props = {
    navigation: Navigation;
};

const Dashboard = ({navigation}: Props) => {
    const [name, setName] = useState(undefined);

    useEffect(() => {
        AuthService.getUserName(setName);
    }, []);

    const _onLogoutPress = async () => {
        await AuthService.logout();
        navigation.navigate('Init');
    }

    return (
        <>
        <AppBarHeader navigation={navigation} title={'Dashboard'} />
        <Background>
            <Logo/>
            <Header>Hola, {name}</Header>
            <Paragraph>
                Aquí no se que poner
            </Paragraph>
            <Button mode="outlined" onPress={_onLogoutPress}>
                Logout
            </Button>
        </Background>
        </>
    );
};

export default memo(Dashboard);
