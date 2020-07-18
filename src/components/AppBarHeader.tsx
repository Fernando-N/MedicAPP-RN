import React, {memo, useState} from 'react';
import { Keyboard } from 'react-native';
import {Appbar, Menu} from 'react-native-paper';
import {Navigation, MenuDots} from "../models/";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';

type Props = { navigation : Navigation } & { previous?: boolean } & { title?: string } & {showDots?: boolean} & {menu?: [MenuDots]};

const AppBarHeader = ({ navigation, previous, title, showDots, menu }: Props) => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    let menuItems = [];

    if (showDots) {
        for (let x = 0; x < menu.length; x++) {
            menuItems.push(
                <Menu.Item key={x} icon="edit" title={menu[x].title} onPress={menu[x].onPress} />
            )
        }
    }

    return (
        <Appbar.Header>
            {previous ? (
                <Appbar.BackAction
                    onPress={() => navigation.goBack()}
                    color={'#FFF'}
                />
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        navigation.openDrawer();
                    }}
                >
                    <Icon name="md-menu" size={30} color={'#FFF'} style={{marginLeft: 15}} />
                </TouchableOpacity>
            )}

            <Appbar.Content title={title} />

            {showDots &&
                <Menu
                    onDismiss={() => setIsMenuVisible(false)}
                    visible={isMenuVisible}
                    anchor={
                        <Appbar.Action
                            disabled={false}
                            color="white"
                            icon="dots-vertical"
                            onPress={() => setIsMenuVisible(true)}
                        />
                    }>
                    {menuItems}
                </Menu>
            }

        </Appbar.Header>
    );
};

export default memo(AppBarHeader);
