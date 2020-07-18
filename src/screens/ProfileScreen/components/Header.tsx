import React, {memo} from 'react'
import {StyleSheet,Text,View, Image, Alert} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";
import Feather from 'react-native-vector-icons/Feather';
import {User, Navigation} from '../../../models/';
import Rating from "../../../components/Rating";

type Props = {
    navigation: Navigation,
    user: User,
    isMyProfile: boolean,
};

const Header = ({navigation, user, isMyProfile}: Props) => {

    const _contact = () => {

        if (isMyProfile) {
            Alert.alert('Error', 'No puedes contactarte a ti mismo.');
            return;
        }

        navigation.navigate('MessageScreen', {
            userId: user.key,
            name: `${user.firstName} ${user.lastName}`
        })
    }

    return (
        <LinearGradient colors={[colors.orange, colors.pink]} start={{x: 0, y:0}} end={{x: 1, y: 1}}>
            <View style={{marginHorizontal: 32, paddingTop: 0, paddingBottom: 64}}>

                <View style={styles.imageContainer}>
                    <View>
                        <Image
                            source={{uri: user.profileImage}}
                            style={{width: 100, height: 100, borderRadius: 100}}
                        />
                    </View>
                </View>

                <View style={[styles.center, {marginVertical: 12}]}>

                    <Text style={styles.title}>{`${user.firstName} ${user.lastName}`}</Text>
                    <View style={styles.imageContainer}>
                        <Rating rating={4} size={32} />
                    </View>

                    <TouchableOpacity style={styles.follow} onPress={() => _contact()}>
                        <Feather name="message-circle" size={20} color="rgba(255, 255, 255, 0.6)"/>
                        <Text style={styles.followText}>Contactar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </LinearGradient>
    )
};

const colors = {
    darkBg: "#222",
    pink: "#0e9ae6",
    orange: "#0edde6",
    text: "#fff",
}

const styles = StyleSheet.create({
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.text,
        fontSize: 30,
    },
    subTitle: {
        fontWeight: "600",
        textTransform: "uppercase",
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 15,
        letterSpacing: 1,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
        shadowColor: colors.darkBg,
        shadowOffset: { height: 3, width: 1 },
        shadowOpacity: 0.5,
    },
    check: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.text,
        borderRadius: 100,
        width: 32,
        height: 32,
        shadowColor: colors.darkBg,
        shadowOffset: { height: 3, width: 1 },
        shadowOpacity: 0.3,
        position: "absolute",
        zIndex: 1,
        right: -16,
        bottom: 16,
    },
    follow: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.pink,
        borderRadius: 100,
        flexDirection: "row",
        paddingHorizontal: 24,
        paddingVertical: 8,
        marginTop: 16,
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 2,
    },
    followText: {
        fontSize: 16,
        color: colors.text,
        fontWeight: "600",
        marginLeft: 4,
    },
})

export default memo(Header);
