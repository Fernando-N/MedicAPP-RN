import React, {memo, useState, useEffect} from 'react';
import Background from '../../components/Background';
import AppBarHeader from "../../components/AppBarHeader";
import {Text} from "react-native-paper";

const EditProfileScreen = () => {
    const [name, setName] = useState(undefined);

    useEffect(() => {

    }, []);

    return (
        <>
        <AppBarHeader previous={true} title={'Editar perfil'} />
        <Background>
            <Text>EditProfileScreen</Text>
        </Background>
        </>
    );
};

export default memo(EditProfileScreen);
