import React, {memo} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import List from "../../../components/List";
import {Card, TouchableRipple} from "react-native-paper";

type Props = {
    data: any,
    loading: any,
    getHospitals,
    page: any,
    setPage: any,
};

const HospitalsList = ({data, page, getHospitals, setPage, loading}: Props) => {

    const _renderHospital = (hospital) => (
        <Card style={styles.myCard}>
            <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
                <View style={styles.cardView}>
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{`${hospital.name}`}</Text>
                        <Text style={styles.text2}>{`${hospital.address}`}</Text>
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )

    const _incrementAndGetData = () => {
        getHospitals(page + 1);
        setPage(page + 1);
    }

    return (
        <List
            data={data}
            isLoading={loading}
            incrementAndGetData={_incrementAndGetData}
            renderItem={_renderHospital}
            noDataMsg={'No se encontraron hospitales :('}
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

export default memo(HospitalsList);
