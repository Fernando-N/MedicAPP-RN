import React, {memo, useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import AppBarHeader from "../../components/AppBarHeader";
import {Button, Paragraph} from "react-native-paper";
import ReportForm from "./components/ReportForm";
import {theme} from "../../core/theme";
import {ProfileService} from "../../services/profile/ProfileService";

type Props = {
    route: any
};

const ReportProfileScreen = ({route}: Props) => {

    const [message, setMessage] = useState({error: '', value: ''});

    const _sendReport = async () => {
        return await ProfileService.reportProfile(route.params.userId, message.value);
    }

    const _onReportPress = async () => {
        const response = await _sendReport();
        const message = response.error ? 'Ocurrio un error al reportar el perfil, intentalo mas tarde' : 'Perfil reportado con exito, gracias por tu ayuda!';
        Alert.alert('Perfil reportado con exito', message);
    }

    return (
        <>
        <AppBarHeader previous={true} title={`Reportar ${route.params.name}`} />
        <Paragraph style={styles.paragraph}>Cuentanos que paso...</Paragraph>
        <ReportForm userId={route.params.userId} comment={message} setComment={setMessage} />
        <Button mode="contained" style={styles.button} labelStyle={styles.labelButton} onPress={_onReportPress}> Reportar </Button>
        </>
    );
};

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 15,
        fontSize: 21,
        lineHeight: 26,
        color: theme.colors.secondary,
        textAlign: 'center',
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
    }
});

export default memo(ReportProfileScreen);
