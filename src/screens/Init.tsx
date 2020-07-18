import React, {memo, useEffect} from 'react';
import {AuthService} from '../clients/auth/AuthService';
import {Navigation} from '../models/';
import LoadingState from "../components/LoadingState";

type Props = {
    navigation: Navigation;
};

const Init = ({navigation}: Props) => {

    useEffect(() => {
        AuthService.isLoggedIn(navigation);
    })

    return <LoadingState />;
};

export default memo(Init);
