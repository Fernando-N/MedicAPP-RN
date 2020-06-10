import React, {memo, useState, useEffect} from 'react';
import {AuthService} from '../clients/auth/AuthService';
import {HomeScreen, Dashboard} from '../screens';
import {Navigation} from "../types";

type Props = {
    navigation: Navigation;
};

const Init = ({navigation}: Props) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        AuthService.isLoggedIn(setIsUserLoggedIn);
    })

    return (
        isUserLoggedIn ? <Dashboard navigation={navigation} /> : <HomeScreen navigation={navigation} />
    )
};

export default memo(Init);
