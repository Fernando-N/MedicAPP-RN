import React, {memo} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import {Navigation} from '../../../models/';
import LinearGradient from "react-native-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
};

const About = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>ABOUT ME</Text>
            <Text style={styles.about}>
                Nunc justo eros, vehicula vel vehicula ut, lacinia a erat. Nam fringilla eros... Nullam aliquam interdum
                ipsum et tempor. Phasellus odio felis, scelerisque eu purus quis.
            </Text>
        </View>
    )
};

const colors = {
    darkBg: "#222",
    pink: "#0e9ae6",
    orange: "#0edde6",
    text: "#fff",
    darkHl: "#666",
}

const styles = StyleSheet.create({
    container: {
        margin: 32,
    },
    about: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.darkHl,
        marginTop: 8,
        lineHeight: 22,
    },
    sectionTitle: {
        fontWeight: "700",
        color: colors.text,
        fontSize: 15,
    },
})

export default memo(About);
