import React, {memo} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import Rating from "../../../components/Rating";
import {Card, TouchableRipple} from "react-native-paper";
import {NavigationService} from "../../../services/navigation/NavigationService";
import List from "../../../components/List";

type Props = {
    data: any,
    loading: any,
    getParamedics,
    page: any,
    setPage: any,
};

const ParamedicsList = ({data, page, getParamedics, setPage, loading}: Props) => {

    const _goToProfile = (userId) => {
        NavigationService.navigate('ProfileScreen', {userId: userId})
    }

    const _renderParamedic = (paramedic) => (
        <Card style={styles.myCard}>
            <TouchableRipple rippleColor="rgba(0, 0, 0, .32)"
                             onPress={() => _goToProfile(paramedic.key)}
            >
                <View style={styles.cardView}>
                    <Image style={{width: 75, height: 75, borderRadius: 100}} source={{uri: paramedic.profileImage}}/>

                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{`${paramedic.firstName} ${paramedic.lastName}`}</Text>
                        <Text style={styles.text2}>{`${paramedic.region.label} - ${paramedic.commune.label}`}</Text>
                        <Rating rating={paramedic.stats.rating} size={25} />
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )

    const _incrementAndGetData = () => {
        getParamedics(page + 1);
        setPage(page + 1);
    }

    return (
        <List
            data={data}
            isLoading={loading}
            incrementAndGetData={_incrementAndGetData}
            renderItem={_renderParamedic}
            noDataMsg={'No se encontraron paramedicos :('}
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
    text: {
        fontSize: 18,
    }
})

export default memo(ParamedicsList);
