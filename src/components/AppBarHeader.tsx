import React, {memo, useState} from 'react';
import { Keyboard } from 'react-native';
import {Appbar, Menu} from 'react-native-paper';
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationService} from "../services";
import { useNavigation } from '@react-navigation/native';

type Props = {
    previous?: boolean,
    search?: boolean,
    setIsDialogVisible?: any,
    title?: string,
    showDots?: boolean,
    menu?: any,
    menuFunctions?: any,
};

const AppBarHeader = ({ previous, title, showDots, menu, menuFunctions, search, setIsDialogVisible }: Props) => {
    const navigation = useNavigation();

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    let menuItems = [];

    if (showDots) {
        for (let x = 0; x < menu.length; x++) {
            menuItems.push(
                <Menu.Item key={x} icon={menu[x].icon} title={menu[x].title} onPress={menuFunctions[x].onPress} />
            )
        }
    }

    return (
        <Appbar.Header>
            {previous ? (
                <Appbar.BackAction
                    onPress={() => NavigationService.goBack()}
                    color={'#FFF'}
                />
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        navigation.openDrawer();
                    }}
                >
                    <Icon name="menu" size={30} color={'#FFF'} style={{marginLeft: 15}} />
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

            {search &&
                <Appbar.Action icon={'magnify'} onPress={() => setIsDialogVisible(true)} />
            }

        </Appbar.Header>
    );
};

export default memo(AppBarHeader);
