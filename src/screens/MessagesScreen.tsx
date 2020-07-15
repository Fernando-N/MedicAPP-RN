import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Card, TouchableRipple} from 'react-native-paper';
import {Navigation} from '../types';
import {FlatList} from "react-native-gesture-handler";
import AppBarHeader from "../components/AppBarHeader";
import StarIndicator from "../components/StarIndicator";
import {ChatService} from '../clients/chat/ChatService';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {AuthService} from "../clients/auth/AuthService";

type Props = {
    navigation: Navigation;
};

const MessagesScreen = ({navigation}: Props) => {

    const socket = new SockJS('http://192.168.1.97:8080/chat-websocket');
    const stompClient = Stomp.over(socket);
    const [data, setData] = useState([]);

    const callback = (e) => {
        console.log("En el callback")
        const msg = e.body;
        console.log(msg)
        if (msg) {
            setData(e.body)
        }
    }

    useEffect(() => {
        const initClient = async () => {
            const userId = await AuthService.getUserId();

            const headers = {}//{Authorization: `Bearer ${jwt}`};
            stompClient.connect(headers, () => {
                stompClient.subscribe(
                    `/chat/messages/${userId}`, callback, headers,
                );
            });

            return () => stompClient && stompClient.disconnect();
        }

        const getMessages = async () => {
            const response = await ChatService.getAll();
            setData(response.data);
        }

        initClient();
        getMessages();

    }, [])


    const styles = StyleSheet.create({
        myCard: {
            margin: 5,
        },
        cardView: {
            flexDirection: 'row',
            padding: 6,
        },
        text: {
            fontSize: 18,
            textTransform: 'capitalize',
        },
        text2: {
            fontSize: 16,
        }
    });

    const renderMessages = (message) => (
        <Card style={styles.myCard}>
            <TouchableRipple
                onPress={() => {
                    navigation.navigate('MessageScreen', {
                        userId: message.user._id,
                        name: message.user.name
                    })
                }}
                rippleColor="rgba(0, 0, 0, .32)"
            >
                <View style={styles.cardView}>
                    <Image
                    style={{width: 60, height: 60, borderRadius: 30}}
                    source={{uri: message.user.avatar}}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{message.user.name}</Text>
                        <Text style={styles.text2}>{message.text}</Text>
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    );

    return (
        <>
            <AppBarHeader navigation={navigation} title={'Mensajes'} />
            <View>
                <FlatList
                    data={data}
                    renderItem={({item}) => {
                        return renderMessages(item)
                    }}
                    keyExtractor={(item) => `${item._id}`}
                />
            </View>
        </>
    );
};



export default memo(MessagesScreen);

