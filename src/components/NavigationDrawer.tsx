import React, {memo, useState, useEffect} from 'react';
import { View, StyleSheet} from 'react-native';
import {Drawer, Avatar, Title, Caption, TouchableRipple, Switch, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthService} from "../clients/auth/AuthService";
import {avatarDefault} from "../constants/default";
import { useNavigation } from '@react-navigation/native';

type Props = {
    navigation: any,
    props?: any
};

const NavigationDrawer = ({props}: Props) => {
    const [userInfo, setUserInfo] = useState({userId: '', name: '', email: '', photo: avatarDefault});

    useEffect(() => {
        AuthService.getUserInfo(setUserInfo);
    }, []);

    const navigation = useNavigation();

    const _onLogoutPress = async () => {
        await AuthService.logout();
        navigation.navigate('Init');
    }

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <Avatar.Image size={100} source={{ uri: userInfo.photo ? userInfo.photo : avatarDefault }} />
                    <Title style={styles.title}>{userInfo.name}</Title>
                    <Caption style={styles.caption}>{userInfo.email}</Caption>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="account-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Perfil"
                        onPress={() => navigation.navigate('ProfileScreen', {userId: userInfo.userId})}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons name="message-text-outline" color={color} size={size}/>
                        )}
                        label="Mensajes"
                        onPress={() => navigation.navigate('MessagesScreen')}
                    />
                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="account-supervisor-circle"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Paramedicos"
                        onPress={() => navigation.navigate('ParamedicsScreen')}
                    />

                    <DrawerItem
                        icon={({color, size}) => (
                            <MaterialCommunityIcons
                                name="logout"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Cerrar sesión"
                        onPress={() => _onLogoutPress()}
                    />
                </Drawer.Section>

            </View>
        </DrawerContentScrollView>
    )
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        marginTop: 20,
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    infoUser: {
        height: 71,
        flexDirection: "row",
        marginTop: 79,
        marginLeft: 25,
        marginRight: 7
    }
});

export default memo(NavigationDrawer);
