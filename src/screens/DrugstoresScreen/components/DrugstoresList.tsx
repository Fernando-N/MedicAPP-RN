import React, {memo} from 'react'
import {StyleSheet,Text,View, Image} from 'react-native'
import List from "../../../components/List";
import {Card, TouchableRipple} from "react-native-paper";
import Paragraph from "../../../components/Paragraph";

type Props = {
    data: any,
    loading: any,
    getDrugstores,
    page: any,
    setPage: any,
};

const DrugstoresList = ({data, page, getDrugstores, setPage, loading}: Props) => {

    const _renderDrugstore = (drugstore) => (
        <Card style={styles.myCard}>
            <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
                <View style={styles.cardView}>
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{`${drugstore.name}`}</Text>
                        <Text style={styles.text2}>{`${drugstore.address}`}</Text>
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )

    const _renderAllNight = (drugstore) => (
        <Card style={styles.myCard}>
            <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
                <View style={styles.cardView}>
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{`${drugstore.name}`}</Text>
                        <Text style={styles.text2}>{`${drugstore.address}`}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.text2, {width: '50%'}]}>{`Horario: ${drugstore.aperture}-${drugstore.close}`}</Text>
                            <Text style={[styles.text2, {width: '50%', textAlign: 'right'}]}>{`Celular: ${drugstore.phone}`}</Text>
                        </View>
                    </View>
                </View>
            </TouchableRipple>
        </Card>
    )

    const _incrementAndGetData = () => {
        getDrugstores(page + 1);
        setPage(page + 1);
    }

    return (
        <View style={{marginTop: 10}}>
            <Paragraph>Farmacias de turno</Paragraph>
            <List
                data={data.drugstoresAllNight}
                isLoading={loading}
                incrementAndGetData={_incrementAndGetData}
                renderItem={_renderAllNight}
                noDataMsg={'No se encontraron farmacias :('}
            />
            <View style={{marginTop: 10}}>
                <Paragraph>Farmacias cercanas</Paragraph>
                <List
                    data={data.drugstores}
                    isLoading={loading}
                    incrementAndGetData={_incrementAndGetData}
                    renderItem={_renderDrugstore}
                    noDataMsg={'No se encontraron farmacias :('}
                />
            </View>
        </View>
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

export default memo(DrugstoresList);
