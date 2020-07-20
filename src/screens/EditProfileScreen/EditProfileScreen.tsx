import React, {memo, useState, useEffect} from 'react';
import Background from '../../components/Background';
import {Navigation} from "../../models/";
import AppBarHeader from "../../components/AppBarHeader";
import {Text} from "react-native-paper";

type Props = {
    navigation: Navigation;
};

const EditProfileScreen = ({navigation}: Props) => {
    const [name, setName] = useState(undefined);

    useEffect(() => {

    }, []);

    return (
        <>
        <AppBarHeader previous={true} navigation={navigation} title={'Editar perfil'} />
        <Background>
            <Text>EditProfileScreen</Text>
        </Background>
        </>
    );
};

export default memo(EditProfileScreen);
