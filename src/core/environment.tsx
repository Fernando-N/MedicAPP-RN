export const host = 'http://192.168.1.97:8080';
//export const host = 'http://190.20.230.117:8080';

//TODO variable con endpoint centralizada
export const enpoints = {
    "auth": {
        "login": "/auth/login",
        "forgotPassword": "/auth/forgot",
        "resetPassword": "/auth/reset"
    },
    "chat": {
        "http": {
            "getMessages": "/chat/messages/get",
            "getMessagesFromUserId": "/chat/messages/get",
        },
        "websocket": {
            "broker": "/chat-websocket",

        }
    }
}
