const formatObject = (object?: any) => {
    let output = '';
    for (let property in object) {
        if (property === 'access_token' || property === 'refresh_token' || property == 'toJSON') {
            output += property + ': *************** | ';
        }else {
            output += property + ': ' + object[property]+' | ';
        }
    }
    return output;
}


export const LogUtil = {
    formatObject,
};
