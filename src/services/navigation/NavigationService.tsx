import * as React from 'react';
import Navigation from "../../models/Navigation";

export const navigationRef: Navigation = React.createRef();

const navigate = (name: string, params?: {}) => {
    navigationRef.current?.navigate(name, params);
}

const reset = (name: string) => {
    navigationRef.current?.reset({
        routes: [{name}]
    });
}

const goBack = () => {
    navigationRef.current?.goBack();
}

const openDrawer = () => {
    navigationRef.current?.openDrawer();
}

export const NavigationService = {
    navigate,
    reset,
    goBack,
    openDrawer
}
