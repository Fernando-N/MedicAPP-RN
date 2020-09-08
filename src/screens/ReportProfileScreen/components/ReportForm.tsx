import React, {memo, useRef, useState} from 'react'
import {View} from 'react-native'
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
                onChangeText={setComment}
                error={comment.error}
                onSubmitEditing={() => {}}
                multiline={true}
            />
        </View>
);


export default memo(ReportForm);
