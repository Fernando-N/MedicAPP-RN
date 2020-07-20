import React, {memo} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import {Navigation} from '../../../models/';
import Rating from "../../../components/Rating";
import {Card, TouchableRipple} from "react-native-paper";
import {FlatList} from "react-native-gesture-handler";
import {avatarDefault} from "../../../constants/default";

type Props = {
    data: any
};

const FeedbacksList = ({data}: Props) => {

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

    return (
        <FlatList
            data={data}
            renderItem={({item}) => (_renderFeedback(item))}
            keyExtractor={(item) => item.id}
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
