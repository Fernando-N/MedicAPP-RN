import React, {memo, useState} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import Rating from "../../../components/Rating";
import {ActivityIndicator, Card, TouchableRipple} from "react-native-paper";
import {FlatList} from "react-native-gesture-handler";
import {avatarDefault} from "../../../constants/default";
import List from "../../../components/List";

type Props = {
    data: any,
    loading: any,
    getFeedback,
    page: any,
    setPage: any,
};

const FeedbacksList = ({data, loading, getFeedback, page, setPage}: Props) => {

    const _renderFeedback = (feedback) => (
        <Card style={styles.myCard}>
            <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
                <View style={styles.cardView}>
                    <Image
                        style={{width: 60, height: 60, borderRadius: 100}}
                        source={{uri: feedback.anon ? avatarDefault : feedback.from.profileImage}}/>

                    <View style={{marginLeft: 10, flex: 1}}>
                        <View style={styles.name}>
                            <Text style={styles.text}>{`${feedback.anon ? 'Anonimo' : feedback.from.firstName + ' ' + feedback.from.lastName}`}</Text>
                            <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                                <Rating rating={feedback.rate} size={20} />
                            </View>
                        </View>
                        <Text style={styles.text2}>{feedback.comment}</Text>
                        <Text style={styles.text3}>{feedback.date.split(' ')[0]}</Text>
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )

    const _incrementAndGetData = () => {
        getFeedback(page + 1);
        setPage(page + 1);
    }

    return (
        <List
            data={data}
            isLoading={loading}
            incrementAndGetData={_incrementAndGetData}
            renderItem={_renderFeedback}
        />
    )
};

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
    },
    cardView: {
        flexDirection: 'row',
        padding: 6,
    },
    name: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 18,
    },
    text3: {
        textAlign: 'right',
        fontSize: 12,
        marginRight: 5
    }
})

export default memo(FeedbacksList);
