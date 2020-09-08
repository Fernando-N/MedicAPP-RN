type User = {
    key?: string,
    email?: string,
    password?: string,
    rut?: string,
    firstName?: string,
    lastName?: string,
    birthDay?: Date,
    commune?: {
        value?: string,
        label?: string
    },
    region?: {
        value?: string,
        label?: string
    },
    aboutMe?: string,
    showAddress?: boolean,
    address?: string,
    profileImage?: string,
    roleEntities?: [{
        name?: string
    }],
    paramedic?: boolean,
    titleImage?: string,
    graduationYear?: number,
    certificateNationalHealth?: string
    carnetImage?: string,
}

export default User;
