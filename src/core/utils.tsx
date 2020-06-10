import {rutUtils} from '../utils/rutUtils'

const rut = (target: string, setRut: Function) => {
    if (rutUtils.validate( rutUtils.clean(target) )) {
        setRut({value: rutUtils.format(target), error: ''});
    }
    else setRut({value: rutUtils.format(target), error: 'Debes ingresar un rut valido'});
}

const name = (target: string) => {
    if (!target || target.length <= 0) return 'Debes ingresar tu nombre';
    return '';
};

const email = (target: string) => {
    const regExp = /\S+@\S+\.\S+/;
    if (!target || target.length <= 0) return 'Debes ingresar tu email';
    if (!regExp.test(target)) return 'Debes ingresar un email valido.';
    return '';
};

const password = (target: string) => {
    if (!target || target.length <= 0) return 'Debes ingresar tu contraseña';
    return '';
};

export const Validate = {
    rut,
    name,
    email,
    password
}
