import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SessionService} from "../../../services";
import {avatarDefault} from "../../../constants/default";
import {Avatar, Surface} from "react-native-paper";

const Header = () => {
    const [userInfo, setUserInfo] = useState({userId: '', name: '', email: '', photo: avatarDefault});

    const _getUserInfo = async () => {
        const response = await SessionService.getUserInfo();
        setUserInfo(response)
    }

    useEffect(() => {
        _getUserInfo();
    }, []);


    return (
        <>
            <Surface style={styles.container}>
                <View style={styles.weatherText}>
                    <Text style={styles.tempText}>{userInfo.name}</Text>
                </View>

                <View style={styles.alignRight}>
                    <Avatar.Image size={60} source={{ uri: userInfo.photo }} />
                </View>
            </Surface>
            <View style={styles.shadowBottom}/>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 10,
        height: 90,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    alignRight: {
        flex: 1,
        alignItems: 'flex-end'
    },
    shadowBottom: {
        backgroundColor: "#fff",
        height: 1,
        elevation: 5,
        shadowColor: 'rgb(49,149,46)',
    },
    containerWeatherAir: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 15
    },
    weatherImage: {
        height: 53,
        width: 53,
        marginTop: 6,
    },
    weatherText: {
        marginLeft: 3,
        marginTop: 12,
        marginBottom: 16,
    },
    tempText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    descText: {
        color: '#000',
        marginTop: 1,
        fontSize: 13
    },
    image35: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 64,
        width: 91,
    },
    loremIpsum2: {
        top: 12,
        left: 79,
        position: 'absolute',
        color: '#121212',
    },
    loremIpsum3: {
        top: 32,
        left: 79,
        position: 'absolute',
        color: '#121212',
    },
    image35Stack: {
        width: 161,
        height: 64,
        marginLeft: 16,
    },

});

export default Header;
