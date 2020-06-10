import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

type Props = {
    children: React.ReactNode;
};

const ScrollContainer = ({children}: Props) => (
    <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps='handled'
    >
        <View
            style={styles.container}
        >
            {children}
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(ScrollContainer);
