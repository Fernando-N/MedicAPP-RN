import React, {memo} from 'react';
import { Keyboard } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import {Navigation} from "../types";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';

type Props = { navigation : Navigation } & { previous?: boolean } & { title?: string };

const AppBarHeader = ({ navigation, previous, title }: Props) => {

    return (
        <Appbar.Header>
            {previous ? (
                <Appbar.BackAction
                    onPress={navigation.pop}
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
        </Appbar.Header>
    );
};

export default memo(AppBarHeader);
