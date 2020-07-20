import React, {memo, useEffect, useState} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import {Navigation} from '../../models';
import AppBarHeader from "../../components/AppBarHeader";
import {ParamedicService} from "../../clients/paramedic/ParamedicService";
import FeedbacksList from "./components/FeedbacksList";

type Props = {
    navigation: Navigation,
    route: any,
};

const FeedbacksScreen = ({navigation, route}: Props) => {

    const [data, setData] = useState([]);

    const _getFeedback = async () => {
        const response = await ParamedicService.getFeedbacksTo(route.params.userId);
        setData(response.data);
    }

    useEffect(() => {
        _getFeedback();

    }, [])

    return (
        <>
            <View style={{flex: 1}}>

                <AppBarHeader
                    navigation={navigation}
                    previous={true}
                    title={`Comentarios de ${route.params.name}`}
                />

                <FeedbacksList data={data} />

            </View>
        </>
    )
};

const colors = {
    darkBg: "#222",
    pink: "#0e9ae6",
    orange: "#0edde6",
    text: "#fff",
    darkHl: "#666",
}

const styles = StyleSheet.create({
    container: {
        margin: 32,
    },
    about: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.darkHl,
        marginTop: 8,
        lineHeight: 22,
    },
    sectionTitle: {
        fontWeight: "700",
        color: colors.text,
        fontSize: 15,
    },
})

export default memo(FeedbacksScreen);
