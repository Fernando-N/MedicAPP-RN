import React, {memo} from 'react'
import {StyleSheet, Text, View} from 'react-native'

type Props = {
    stats: {
        valuations: any,
        contacts: any,
        rating: any
    },
};

const Stats = ({stats}: Props) => (
    <View style={styles.container}>
        <View style={styles.statContainer}>
            <Text style={styles.statNumber}>{stats.valuations}</Text>
            <Text style={styles.stat}>Valoraciones</Text>
        </View>
        <View style={[styles.statContainer, styles.divider]}>
            <Text style={styles.statNumber}>{stats.contacts}</Text>
            <Text style={styles.stat}>Contactos</Text>
        </View>
        <View style={styles.statContainer}>
            <Text style={styles.statNumber}>{stats.rating}</Text>
            <Text style={styles.stat}>Puntuación</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginTop: 45,
    },
    indicatorTab: {
        backgroundColor: 'transparent',
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    sceneContainer: {
        marginTop: 10,
    },
    socialIcon: {
        marginLeft: 14,
        marginRight: 14,
    },
    socialRow: {
        flexDirection: 'row',
    },
    tabBar: {
        backgroundColor: '#EEE',
    },
    tabContainer: {
        flex: 1,
        marginBottom: 12,
    },
    tabLabelNumber: {
        color: 'gray',
        fontSize: 12.5,
        textAlign: 'center',
    },
    tabLabelText: {
        color: 'black',
        fontSize: 22.5,
        fontWeight: '600',
        textAlign: 'center',
    },
    userBioRow: {
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: 'gray',
        fontSize: 13.5,
        textAlign: 'center',
    },
    userImage: {
        borderRadius: 60,
        height: 120,
        marginBottom: 10,
        width: 120,
    },
    userNameRow: {
        marginBottom: 10,
    },
    userNameText: {
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 12,
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 15,
        marginBottom: 8,
        backgroundColor: '#0e9ae6',
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        borderRadius: 16,
        marginTop: -48,
    },
    statContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "600",
        color: '#fff',
    },
    stat: {
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 1,
        textTransform: "uppercase",
        color: '#fff',
        marginTop: 6,
    },
    divider: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#fff',
    },
})

export default memo(Stats);
