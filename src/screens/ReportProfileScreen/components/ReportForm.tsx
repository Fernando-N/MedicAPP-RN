import React, {memo, useRef, useState} from 'react'
import {StyleSheet,Text,View, Image, Alert} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import {TouchableOpacity} from "react-native-gesture-handler";
import Feather from 'react-native-vector-icons/Feather';
import {User, Navigation} from '../../../models/';
import Rating from "../../../components/Rating";
import Paragraph from "../../../components/Paragraph";
import {TextInput} from "react-native-paper";

type Props = {
    userId: string,
    comment: any,
    setComment: any
};

const ReportForm = ({userId, comment, setComment}: Props) => (
        <View>
            <TextInput
                style={{ marginHorizontal: 20, height: 150 }}
                label="Comentario"
                value={comment.value}
                onChangeText={text => setComment({...comment, value: text})}
                error={comment.error}
                onSubmitEditing={() => {}}
                multiline={true}
            />
        </View>
);


export default memo(ReportForm);
