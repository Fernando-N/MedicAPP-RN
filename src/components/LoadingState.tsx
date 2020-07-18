import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../core/theme';
import {ActivityIndicator, Text} from "react-native-paper";

const LoadingState = () => (
    <View style={[styles.center, styles.container]}>
        <ActivityIndicator animating={true} size={100} color={theme.colors.primary} />
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
    }
});

export default memo(LoadingState);
