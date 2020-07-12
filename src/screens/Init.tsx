import React, {memo, useEffect} from 'react';
import {AuthService} from '../clients/auth/AuthService';
import {Navigation} from "../types";
import { View } from 'react-native';
import {Text, ActivityIndicator} from "react-native-paper";
import {theme} from "../core/theme";

type Props = {
    navigation: Navigation;
};

const Init = ({navigation}: Props) => {

    useEffect(() => {
        AuthService.isLoggedIn(navigation);
    })

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator animating={true} size={50} color={theme.colors.primary} />

            <Text style={{marginTop: 30}}> Cargando.. </Text>
        </View>
    )
};

export default memo(Init);
