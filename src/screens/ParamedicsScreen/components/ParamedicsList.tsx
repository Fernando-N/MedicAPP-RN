import React, {memo} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import {Navigation} from '../../../models/';
import Rating from "../../../components/Rating";
import {Card, TouchableRipple} from "react-native-paper";
import {FlatList} from "react-native-gesture-handler";

type Props = {
    navigation: Navigation,
    data: any
};

const ParamedicsList = ({navigation, data}: Props) => {

    const _goToProfile = (userId) => {
        navigation.navigate('ProfileScreen', {userId: userId})
    }

    const _renderParamedicCard = (paramedic) => (
        <Card style={styles.myCard}>
            <TouchableRipple rippleColor="rgba(0, 0, 0, .32)"
                             onPress={() => _goToProfile(paramedic.key)}
            >
                <View style={styles.cardView}>
                    <Image style={{width: 75, height: 75, borderRadius: 100}} source={{uri: paramedic.profileImage}}/>

                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{`${paramedic.firstName} ${paramedic.lastName}`}</Text>
                        <Text style={styles.text2}>{`${paramedic.region.label} - ${paramedic.commune.label}`}</Text>
                        <Rating rating={paramedic.stats.rating} size={25} />
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )

    return (
        <FlatList
            data={data}
            renderItem={({item}) => (_renderParamedicCard(item))}
            keyExtractor={(item) => item.key}
        />
    )
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
    }
})

export default memo(ParamedicsList);
