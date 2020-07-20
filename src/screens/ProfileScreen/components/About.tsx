import React, {memo} from 'react'
import {StyleSheet,Text,View} from 'react-native'

type Props = {
    aboutMe: string,
};

const About = ({aboutMe} : Props) => (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>SOBRE MI</Text>
            <Text style={styles.about}>{aboutMe}</Text>
        </View>
);

const colors = {
    text: "#000",
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
        textAlign: 'justify'
    },
    sectionTitle: {
        fontWeight: "700",
        color: colors.text,
        fontSize: 15,
    },
})

export default memo(About);
