import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { theme } from './core/theme';
import {
    Init,
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
} from './screens';

const navigationOptionsDefault = {
    headerStyle: {
        backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#FFF',
}

const Router = createStackNavigator(
    {
        Init: {
          screen: Init,
          navigationOptions: {
              headerShown: false,
          }
        },
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                title: 'Ingresar',
                ...navigationOptionsDefault
            }
        },
        RegisterScreen: {
            screen: RegisterScreen,
            navigationOptions: {
                title: 'Registrarme',
                ...navigationOptionsDefault
            }
        },
        ForgotPasswordScreen: {
            screen: ForgotPasswordScreen,
            navigationOptions: {
                title: 'Recuperar contraseña',
                ...navigationOptionsDefault
            }
        },
        Dashboard: {
            screen: Dashboard,
            navigationOptions: {
                title: 'Inicio',
                ...navigationOptionsDefault
            }
        },
    },
    {
        initialRouteName: 'Init',
    }
);

const prevGetStateForActionHomeStack = Router.router.getStateForAction;

Router.router.getStateForAction = (action, state) => {

    if (state && action.type === 'ReplaceCurrentScreen') {
        const routes = state.routes.slice(0, state.routes.length - 1);
        routes.push(action);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
    }else if (state && action.type === 'resetStack') {
        const routes = state.routes.slice(0, 0);
        routes.push(action);
        return {
            ...state,
            routes,
            index: 0,
        }
    }

    return prevGetStateForActionHomeStack(action, state);

};

export default createAppContainer(Router);
