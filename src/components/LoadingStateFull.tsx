import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from "react-native-paper";
import LottieView from "lottie-react-native";

const LoadingStateFull = () => (
    <View style={[styles.center, styles.container]}>
        <LottieView
            source={require('../assets/animations/medical-loading.json')}
            style={styles.animation}
            resizeMode = 'cover'
            autoPlay
            loop={true}
        />
        <Text style={styles.text}>Cargando..</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 30,
        fontSize: 20
    },
    animation: {
        width: 150,
        height: 150,
        marginBottom: 12,
    },
});

export default memo(LoadingStateFull);
