import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from "react-native-gesture-handler";
import {ActivityIndicator, Text} from "react-native-paper";
import LottieView from "lottie-react-native";

type Props = {
    data: [],
    renderItem: any,
    isLoading: boolean
    incrementAndGetData: any,
    noDataMsg?: string
};

const List = ({data, renderItem, isLoading, incrementAndGetData, noDataMsg}: Props) => (
    <FlatList
        data={data}
        renderItem={({item}) => (renderItem(item))}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => {
            if (!isLoading) return null;
            return (
                <ActivityIndicator
                    style={{ marginVertical: 15, color: '#000' }}
                />
            );
        }}
        ListEmptyComponent={() => (
            !isLoading &&
         <View style={{flex: 1, alignItems: 'center'}}>
             <LottieView
                 source={require('../assets/animations/empty.json')}
                 style={styles.animation}
                 resizeMode = 'cover'
                 autoPlay
                 loop={false}
             />
             <Text>{noDataMsg ? noDataMsg : 'No se encontraron resultados :('}</Text>
         </View>
        )}
        onEndReachedThreshold={0.04}
        onEndReached={() => {
            if (!isLoading && data.length >= 15) {
                incrementAndGetData();
            }
        }}
    />
);

const styles = StyleSheet.create({
    animation: {
        width: 150,
        height: 150,
        marginBottom: 12,
    },
});

export default memo(List);
