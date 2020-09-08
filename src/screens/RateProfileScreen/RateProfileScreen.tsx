import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import AppBarHeader from "../../components/AppBarHeader";
import {Button, Checkbox, Paragraph} from "react-native-paper";
import ReportForm from "../ReportProfileScreen/components/ReportForm";
import {theme} from "../../core/theme";
import Rating from "../../components/Rating";
import {ScrollView} from "react-native-gesture-handler";
import {FeedbackService} from "../../services";

type Props = {
    route: any
};

const RateProfileScreen = ({route}: Props) => {

    const [message, setMessage] = useState('');
    const [stars, setStars] = useState(0);
    const [anon, setAnon] = useState(false);

    const _sendRate = async () => {
        return await FeedbackService.sendFeedback(route.params.userId, message, anon, stars);
    }

    const _onSendPress = async () => {
        const response = await _sendRate();
        const message = response.error ? 'Ocurrio un error al comentar el perfil, intentalo mas tarde' : 'Perfil comentado con exito, gracias por tu ayuda!';
        Alert.alert('Perfil reportado con exito', message);
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <AppBarHeader previous={true} title={`Realizar comentario`} />
            <ScrollView>
                <Paragraph style={styles.paragraph}>Cuentanos sobre {route.params.name}...</Paragraph>
                <ReportForm userId={route.params.userId} comment={message} setComment={setMessage} />
                <Paragraph style={styles.paragraph}>¿Que calificación le darías?</Paragraph>
                <Rating rating={stars} size={30} style={styles.rating} onPressStar={setStars} />
                <View style={styles.divCheckbox}>
                    <Paragraph style={styles.paragraph}>¿Anonimo?</Paragraph>
                    <View style={{marginTop: 8}}>
                        <Checkbox status={anon ? 'checked' : 'unchecked'} onPress={() => setAnon(!anon)} />
                    </View>
                </View>
                <Button mode="contained" style={styles.button} labelStyle={styles.labelButton} onPress={_onSendPress}> Enviar </Button>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 15,
        fontSize: 21,
        lineHeight: 26,
        color: theme.colors.secondary,
        marginLeft: 15,
        marginBottom: 20,
    },
    button: {
        marginHorizontal: 19,
        marginTop: 25
    },
    labelButton: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
    rating: {
        alignItems: 'center'
    },
    divCheckbox: {
        flexDirection: 'row',
        padding: 6
    }
});

export default memo(RateProfileScreen);
