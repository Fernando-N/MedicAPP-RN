import React, {useState, useEffect, useCallback, memo} from 'react';
import {Navigation} from '../../models/';
import AppBarHeader from "../../components/AppBarHeader";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {GiftedChat} from 'react-native-gifted-chat'
import {AuthService} from '../../clients/auth/AuthService';
import {ChatService} from "../../clients/chat/ChatService";
import moment from "moment";

type Props = {
    route: any;
    navigation: Navigation;
};

const MessageScreen = ({route, navigation}: Props) => {

    const socket = new SockJS('http://192.168.1.97:8080/chat-websocket');
    const stompClient = Stomp.over(socket);
    const [userId, setUserId] = useState(undefined);
    const [messages, setMessages] = useState([]);

    const callback = (e) => {
        const msg = JSON.parse(e.body)
        if (msg) {
            msg.createdAt = moment(msg.createdAt);
            appendMsg(msg)
        }
    }

    const sendMessage = async (msg) => {
        const token = await AuthService.getToken();
        stompClient.send('/app/message', {Authorization: 'Bearer ' + token}, JSON.stringify({
            ...msg[0],
            to: route.params.userId
        }));
        msg[0].createdAt = new Date();
        appendMsg(msg)
    }

    const appendMsg = useCallback((message = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    }, []);

    useEffect(() => {
        setMessages([]);
        const initClient = async () => {
            const id = await AuthService.getUserId();
            setUserId(id)
            stompClient.connect({}, () => {
                stompClient.subscribe(
                    `/chat/messages/${id}/${route.params.userId}`, callback, {},
                );
            });
        }

        const getMessages = async () => {
            const response = await ChatService.getAllTo(route.params.userId);
            response.data.forEach(function (valor, indice, array) {
                response.data[indice].createdAt = moment(response.data[indice].createdAt).format('YYYY-MM-DD HH:MM:SS');
            });
            setMessages(previousMessages => GiftedChat.append(previousMessages, response.data));
        }

        initClient();
        getMessages();

        return () => stompClient && stompClient.disconnect();

    }, [])

    return (
        <>
            <AppBarHeader navigation={navigation} title={route.params.name}/>
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
