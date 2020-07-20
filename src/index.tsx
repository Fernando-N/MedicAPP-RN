import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { theme } from './core/theme';
import NavigationDrawer from './components/NavigationDrawer';
import {
    Init,
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    MessagesScreen,
    MessageScreen,
    ProfileScreen,
    ParamedicsScreen,
    MapsScreen,
    FeedbacksScreen,
    EditProfileScreen,
    RateProfileScreen,
    ReportProfileScreen
} from './screens';

const navigationOptionsDefault = {
    headerStyle: {
        backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#FFF',
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NoAuthNavigator = (): React.ReactElement => (
    <Stack.Navigator>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} options={{title: 'Ingresar', ...navigationOptionsDefault}} />
        <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} options={{title: 'Registrarme', ...navigationOptionsDefault}} />
        <Stack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} options={{title: 'Recuperar contraseña', ...navigationOptionsDefault}} />
    </Stack.Navigator>
);

const AuthNavigator = (): React.ReactElement => (
    <Drawer.Navigator drawerContent={(navigation) => <NavigationDrawer navigation={navigation} />}>
        <Drawer.Screen name={'DashboardScreen'} component={Dashboard} options={{unmountOnBlur: true}} />
        <Drawer.Screen name={'ProfileScreen'} component={ProfileScreen} options={{unmountOnBlur: true}} />
        <Drawer.Screen name={'EditProfileScreen'} component={EditProfileScreen} options={{unmountOnBlur: true}} />
        <Drawer.Screen name={'MapsScreen'} component={MapsScreen} options={{unmountOnBlur: true}} />
        <Drawer.Screen name={'FeedbacksScreen'} component={FeedbacksScreen} options={{unmountOnBlur: true}} />
        <Drawer.Screen name={'MessagesScreen'} component={MessagesScreen} />
        <Drawer.Screen name={'MessageScreen'} component={MessageScreen} options={{unmountOnBlur: true}} />
        <Drawer.Screen name={'ParamedicsScreen'} component={ParamedicsScreen} options={{unmountOnBlur: true}} />
        <Drawer.Screen name={'RateProfileScreen'} component={RateProfileScreen} options={{unmountOnBlur: true}} />
        <Drawer.Screen name={'ReportProfileScreen'} component={ReportProfileScreen} options={{unmountOnBlur: true}} />
    </Drawer.Navigator>
);

const AppNavigator = (props: Partial< React.ComponentProps<typeof Stack.Navigator>>): React.ReactElement => (
    <Stack.Navigator {...props} headerMode={'none'} >
        <Stack.Screen name={'Init'} component={Init} options={{headerShown: false}} />
        <Stack.Screen name={'NoAuthNavigator'} component={NoAuthNavigator} />
        <Stack.Screen name={'AuthNavigator'} component={AuthNavigator} />
    </Stack.Navigator>
);

export default AppNavigator;
