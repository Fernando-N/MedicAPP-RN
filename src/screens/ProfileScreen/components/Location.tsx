import React, {memo} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import {Navigation} from '../../../models/';
import LinearGradient from "react-native-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
    location: {
        showAddress: boolean,
        address: string,
        commune: string,
        region: string,
    }
};

const Location = ({location}: Props) => {

    return (
        <View style={styles.container}>
            <View style={{ width: 75, height: 75 }}>
                <Image
                    source={require("../../../assets/images/location.png")}
                    style={{ flex: 1, width: undefined }}
                    resizeMode="center"
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.location}>{`${location.region} - ${location.commune}`}</Text>
                <Text style={styles.distance}>{location.showAddress ? location.address : ''}</Text>
            </View>
            <Entypo name="chevron-right" size={24} color={'#666'} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#ededed',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    location: {
        fontSize: 18,
        color: '#000',
        fontWeight: "500",
    },
    distance: {
        fontSize: 12,
        fontWeight: "800",
        color: '#666',
        marginTop: 4,
        textTransform: "uppercase",
    },
})

export default memo(Location);
