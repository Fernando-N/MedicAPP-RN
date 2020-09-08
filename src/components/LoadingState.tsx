import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

type Props = {
    isLoading: boolean
}

const LoadingStateFull = ({isLoading}: Props) => (
    <View style={styles.container}>
        <Spinner
            visible={isLoading}
            textContent={'Cargando...'}
            textStyle={styles.spinnerTextStyle}
        />
    </View>
);

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
        fontWeight: 'bold'
    },
});

export default memo(LoadingStateFull);
