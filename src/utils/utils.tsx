import {RutUtil} from './RutUtils'

const rut = (target: string, setRut: Function) => {
    if (RutUtil.validate( RutUtil.clean(target) )) {
        setRut({value: RutUtil.format(target), error: ''});
    }
    else setRut({value: RutUtil.format(target), error: 'Debes ingresar un rut valido.'});
}

const name = (target: string) => {
    if (!target || target.length <= 0) return 'Debes ingresar tu nombre.';
    return '';
};

const lastName = (target: string) => {
    if (!target || target.split(' ').length < 2) return 'Debes ingresar tus dos apellidos.';
    return '';
};

const address = (target: string) => {
    if (!target || target.split(' ').length < 2) return 'Debes ingresar tu dirección junto con su número.';
    return '';
}

const email = (target: string) => {
    const regExp = /\S+@\S+\.\S+/;
    if (!target || target.length <= 0) return 'Debes ingresar tu email.';
    if (!regExp.test(target)) return 'Debes ingresar un email valido.';
    return '';
};

const password = (target: string) => {
    if (!target || target.length <= 0) return 'Debes ingresar tu contraseña.';
    if (target.length < 6) return 'La contraseña debe tener al menos 6 caracteres.'
    return '';
};

const password2 = (target: string, target2: string) => {
    if (target != target2) return 'Las contraseñas deben coincidir.'
    return '';
};

export const Validate = {
    rut,
    name,
    lastName,
    address,
    email,
    password,
    password2
}
