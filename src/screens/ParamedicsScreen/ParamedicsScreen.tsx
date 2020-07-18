import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert, Keyboard, Image} from 'react-native';
import {Card, TouchableRipple} from 'react-native-paper';
import {Navigation} from '../../models/';
import {FlatList} from "react-native-gesture-handler";
import AppBarHeader from "../../components/AppBarHeader";
import LoadingState from "../../components/LoadingState";
import {ParamedicService} from '../../clients/paramedic/ParamedicService';
import Rating from "../../components/Rating";

type Props = {
    navigation: Navigation;
};

const ParamedicsScreen = ({navigation}: Props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getParamedics = async () => {
            const response = await ParamedicService.getAll();
            setData(response.data);
            setIsLoading(false)
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
            <TouchableRipple rippleColor="rgba(0, 0, 0, .32)"
                             onPress={() => navigation.navigate('ProfileScreen', {userId: paramedic.key})}
            >
                <View style={styles.cardView}>
                    <Image style={{width: 75, height: 75, borderRadius: 100}} source={{uri: paramedic.profileImage}}/>

                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{`${paramedic.firstName} ${paramedic.lastName}`}</Text>
                        <Text style={styles.text2}>{`${paramedic.region.label} - ${paramedic.commune.label}`}</Text>
                        <Rating rating={4} size={25} />
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    );

    if (isLoading) return <LoadingState />;

    return (
        <>
            <AppBarHeader navigation={navigation} title={'Paramedicos'} />
            <View>
                <FlatList
                    data={data}
                    renderItem={({item}) => (renderParamedic(item))}
                    keyExtractor={(item) => item.key}
                />
            </View>
        </>
    );
};



export default memo(ParamedicsScreen);

