type User = {
    key?: string,
    email?: string,
    rut?: string,
    firstName?: string,
    lastName?: string,
    birthDay?: string,
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
}


export default User;
