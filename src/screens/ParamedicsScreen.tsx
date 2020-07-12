import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert, Keyboard, Image} from 'react-native';
import {Card, TouchableRipple} from 'react-native-paper';
import Background from "../components/Background";
import ScrollContainer from '../components/ScrollContainer';
import {Navigation} from '../types';
import {FlatList, TouchableHighlight} from "react-native-gesture-handler";
import AppBarHeader from "../components/AppBarHeader";
import StarIndicator from "../components/StarIndicator";
import {ParamedicService} from '../clients/paramedic/ParamedicService';

type Props = {
    navigation: Navigation;
};

const ParamedicsScreen = ({navigation}: Props) => {

    const [data, setData] = useState({});

    useEffect(() => {

        console.log('en useEffect')

        const getParamedics = async () => {
            const response = await ParamedicService.getAll();
            setData(response.data);
            console.log(response.data)
        }

        getParamedics();

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
        }
    });

    const renderParamedic = (paramedic) => (
        <Card style={styles.myCard}>
            <TouchableRipple
                onPress={() => console.log('Pressed ' + paramedic.rut)}
                rippleColor="rgba(0, 0, 0, .32)"
            >
                <View style={styles.cardView}><Image
                    style={{width: 60, height: 60, borderRadius: 30}}
                    source={{uri: paramedic.profileImage}}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{paramedic.firstName + ' ' + paramedic.lastName}</Text>
                        <StarIndicator quantity={4} />
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    );

    return (
        <>
            <AppBarHeader navigation={navigation} title={'Paramedicos'} />
            <View>
                <FlatList
                    data={data}
                    renderItem={({item}) => {
                        return renderParamedic(item)
                    }}
                    keyExtractor={(item) => `${item.id}`}
                />
            </View>
        </>
    );
};



export default memo(ParamedicsScreen);

