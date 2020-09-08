import React, {useState, useEffect, useCallback, memo} from 'react';
import AppBarHeader from "../../components/AppBarHeader";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {GiftedChat} from 'react-native-gifted-chat'
import {ChatService} from '../../services';
import moment from "moment";
import { host } from "../../core/environment";
import {SessionService} from "../../services";

type Props = {
    route: any;
};

const MessageScreen = ({route}: Props) => {

    const socket = new SockJS(`${host}/chat-websocket`);
    const stompClient = Stomp.over(socket);
    const [userId, setUserId] = useState(undefined);
    const [messages, setMessages] = useState([]);

    const callback = (e) => {
        const msg = JSON.parse(e.body)
        if (msg) {
            console.log('hora antes de formatear: ' + msg.createdAt)
            msg.createdAt = moment(msg.createdAt).format('YYYY-MM-DD hh:mm:ss');
            console.log('hora despues de formatear: ' + msg.createdAt)
            appendMsg(msg)
        }
    }

    const sendMessage = async (msg) => {
        const token = await SessionService.getToken();
        stompClient.send('/app/message', {Authorization: 'Bearer ' + token}, JSON.stringify({
            ...msg[0],
            to: route.params.userId
        }));
        msg[0].createdAt = new Date();
        console.log(msg)
        appendMsg(msg)
    }

    const appendMsg = useCallback((message = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    }, []);

    useEffect(() => {
        setMessages([]);
        const initClient = async () => {
            const id = await SessionService.getClaim('USER_ID');
            setUserId(id)
            stompClient.connect({}, () => {
                stompClient.subscribe(
                    `/chat/messages/${id}/${route.params.userId}`, callback, {},
                );
            });
        }

        const getMessages = async () => {
            const response = await ChatService.getAllWithUserId(route.params.userId);
            response.data.forEach(function (valor, indice, array) {
                response.data[indice].createdAt = moment(response.data[indice].createdAt).format('YYYY-MM-DD hh:mm:ss');
            });
            setMessages(previousMessages => GiftedChat.append(previousMessages, response.data));
        }

        initClient();
        getMessages();

        return () => stompClient && stompClient.disconnect();

    }, [])

    return (
        <>
            <AppBarHeader previous={true} title={route.params.name}/>
            <GiftedChat
                messages={messages}
                onSend={message => sendMessage(message)}
                placeholder={'Escribe un mensaje...'}
                user={{
                    _id: userId,
                }}
            />
        </>
    )

};

export default memo(MessageScreen);
