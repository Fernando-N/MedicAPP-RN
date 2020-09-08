import React, {memo, useEffect, useState} from 'react'
import { rateProfile } from "./menus";
import { FeedbackService, NavigationService } from "../../services";
import { View } from 'react-native'
import AppBarHeader from "../../components/AppBarHeader";
import FeedbackList from "./components/FeedbacksList";
import LoadingState from "../../components/LoadingState";

type Props = {
    route: any,
};

const FeedbacksScreen = ({route}: Props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(false);
    const [page, setPage] = useState(1);

    const _getFeedback = async () => {
        setIsLoading2(true);
        const response = await FeedbackService.getAllOfUserId(route.params.userId, page);
        setData(prevArray => [...prevArray, ...response.data]);
        setIsLoading(false);
        setIsLoading2(false);
    }

    const rateProfileFunctions = [
        {
            onPress: () => NavigationService.navigate('RateProfileScreen', {
                name: route.params.name,
                userId: route.params.userId
            })
        }
    ]

    useEffect(() => {
        _getFeedback();

    }, [])

    return (
        <>
            <View style={{flex: 1}}>
                <LoadingState isLoading={isLoading} />
                <AppBarHeader
                    previous={true}
                    title={`Comentarios de ${route.params.name}`}
                    showDots={true}
                    menuFunctions={rateProfileFunctions}
                    menu={rateProfile}
                />

                <FeedbackList
                    data={data}
                    loading={isLoading2}
                    getFeedback={_getFeedback}
                    page={page}
                    setPage={setPage}
                />

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

export default memo(FeedbacksScreen);
