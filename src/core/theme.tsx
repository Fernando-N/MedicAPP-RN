import { DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
    default: {
        regular: {
            fontFamily: 'Roboto-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Roboto-Medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Roboto-Light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'Roboto-Thin',
            fontWeight: 'normal',
        },
    },
};


export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0e9ae6',
        secondary: '#414757',
        error: '#f13a59',
    },
    // @ts-ignore
    fonts: configureFonts(fontConfig),
};
