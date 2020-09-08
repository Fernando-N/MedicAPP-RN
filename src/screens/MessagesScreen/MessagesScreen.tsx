import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Card, TouchableRipple} from 'react-native-paper';
import {FlatList} from "react-native-gesture-handler";
import {ChatService} from '../../services';
import AppBarHeader from "../../components/AppBarHeader";
import LoadingState from "../../components/LoadingStateFull";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { host } from "../../core/environment";
import {NavigationService, SessionService} from "../../services";

const MessagesScreen = () => {

    const socket = new SockJS(`${host}/chat-websocket`);
    const stompClient = Stomp.over(socket);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const _initClient = async () => {
        const userId = await SessionService.getClaim('USER_ID');

        stompClient.connect({}, () => {
            stompClient.subscribe(
                `/chat/messages/${userId}`, callback, {},
            );
        });
    }

    const _getMessages = async () => {
        const response = await ChatService.getAll();
        setData(response.data);
        setIsLoading(false)
    }

    const _goToMessage = (userId, name) => {
        NavigationService.navigate('MessageScreen', {userId, name,})
    }

    const callback = (e) => {
        const msg = e.body;
        console.log(msg)
    }

    useEffect(() => {
        _initClient();
        _getMessages();
    }, [])

    const renderMessages = (message) => (
        <Card style={styles.myCard}>
            <TouchableRipple
                onPress={() => _goToMessage(message.user._id, message.user.name)}
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

    if (isLoading) return <LoadingState />;

    return (
        <>
            <AppBarHeader previous={true} title={'Mensajes'} />
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
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 16,
    }
});

export default memo(MessagesScreen);

