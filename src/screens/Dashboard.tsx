import React, {memo, useState, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {Navigation} from '../types';
import {AuthService} from '../clients/auth/AuthService';

type Props = {
    navigation: Navigation;
};

const Dashboard = ({navigation}: Props) => {
    const [name, setName] = useState('');

    useEffect(() => {
        AuthService.getUserName(setName).catch(err => console.log(err));
    });

    const _onLogoutPress = async () => {
        await AuthService.logout();
        navigation.dispatch({
            key: 'HomeScreen',
            type: 'resetStack',
            routeName: 'HomeScreen'
        });
    }

    return (
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
    );
};

export default memo(Dashboard);
