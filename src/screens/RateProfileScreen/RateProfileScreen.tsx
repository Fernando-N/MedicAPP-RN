import React, {memo, useState, useEffect} from 'react';
import Background from '../../components/Background';
import {Navigation} from "../../models/";
import AppBarHeader from "../../components/AppBarHeader";
import {Text} from "react-native-paper";

type Props = {
    navigation: Navigation;
};

const RateProfileScreen = ({navigation}: Props) => {
    const [name, setName] = useState(undefined);

    useEffect(() => {

    }, []);

    return (
        <>
        <AppBarHeader previous={true} navigation={navigation} title={'Reportar perfil'} />
        <Background>
            <Text>RateProfileScreen</Text>
        </Background>
        </>
    );
};

export default memo(RateProfileScreen);
