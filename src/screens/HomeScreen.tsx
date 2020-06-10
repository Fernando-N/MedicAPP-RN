import React, {memo} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import {Navigation} from '../types';

type Props = {
    navigation: Navigation;
};

const HomeScreen = ({navigation}: Props) => {

   return (
        <Background>
            <Logo animated/>
            <Header>MedicAPP</Header>
            <Paragraph>Paramedicos a tu alcance.</Paragraph>
            <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
                Ingresar
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Registrarme
            </Button>
        </Background>
    )
};

export default memo(HomeScreen);
