import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import { theme } from './src/core/theme';
import Main from './src';
import {navigationRef} from "./src/services/navigation/NavigationService";

const App = () => (
    <Provider theme={theme}>
        <NavigationContainer ref={navigationRef}>
            <Main />
        </NavigationContainer>
    </Provider>
);

export default App;
