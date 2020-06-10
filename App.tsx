import React from 'react';
import { Provider } from 'react-native-paper';
import Main from './src';
import { theme } from './src/core/theme';

const App = () => (
    <Provider theme={theme}>
      <Main />
    </Provider>
);

export default App;
