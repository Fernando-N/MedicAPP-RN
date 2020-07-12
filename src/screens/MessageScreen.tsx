import React, {memo, useState, useEffect, useCallback, Component} from 'react';
import {View} from 'react-native';
import {Navigation} from '../types'
import AppBarHeader from "../components/AppBarHeader";
import {Text} from "react-native-paper";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Button from "../components/Button";
import { GiftedChat } from 'react-native-gifted-chat'
import qs from 'querystring';
import {AuthService} from '../clients/auth/AuthService';

type Props = {
    navigation: Navigation;
};

const MessageScreen = ({navigation}: Props) => {

    const socket = new SockJS('http://192.168.1.97:8080/chat-websocket');
    const stompClient = Stomp.over(socket);
    const [userId, setUserId] = useState(undefined);
    const [connected, setConnected] = useState(false);
    const [writing, setWriting] = useState(false);
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: 'test',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Homero loco',
                avatar: 'https://firebasestorage.googleapis.com/v0/b/medicapp-5b6fb.appspot.com/o/HomeroLoco.jpg?alt=media&token=8d276f91-76b8-41e2-8f77-d6777a42c6f6',
            },
        },
    ]);

    const callback = (e) => {
        console.log("En el callback")
        const msg = qs.parse(e.body);
        console.log(msg)
        if (msg) {
            appendMsg(msg)
        }
    }

    const onSendGifted = (messages) => {
        console.log(messages)
        sendMessage(messages)
    }

    const sendMessage = (msg) => {
        console.log("En sendMessage")
        console.log(qs.stringify(msg[0]))
       // stompClient.send('/chat/messages', {}, qs.stringify(msg[0]));
    }

    const appendMsg = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    useEffect(() => {

        const initClient = () => {
            const headers = {}//{Authorization: `Bearer ${jwt}`};

            stompClient.connect(headers, () => {
                stompClient.subscribe(
                    `/chat/messages`, callback, headers,
                );
            });

            return () => stompClient && stompClient.disconnect();


        }


        initClient()

    }, [])


    return (
<>
    <AppBarHeader navigation={navigation} />
            <GiftedChat
                messages={messages}
                onSend={messages => sendMessage(messages)}
                user={{
                    _id: 1,
                }}
            />
            </>
    )

};

export default MessageScreen;
