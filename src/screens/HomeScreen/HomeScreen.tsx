import React, {memo} from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import {NavigationService} from "../../services";

const HomeScreen = () => {

   return (
        <Background>
            <Logo animated/>
            <Header>MedicAPP</Header>
            <Paragraph>Paramedicos a tu alcance.</Paragraph>
            <Button mode="contained" onPress={() => NavigationService.navigate('LoginScreen')}>
                Ingresar
            </Button>
            <Button
                mode="outlined"
                onPress={() => NavigationService.navigate('RegisterScreen')}
            >
                Registrarme
            </Button>
        </Background>
    )
};

export default memo(HomeScreen);
