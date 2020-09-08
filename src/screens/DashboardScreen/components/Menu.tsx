import React from 'react';
import {TouchableOpacity, View, ImageBackground, StyleSheet, Text} from "react-native";
import {NavigationService} from "../../../services";
import {ScrollView} from "react-native-gesture-handler";

const Menu = () => {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.box} onPress={() => NavigationService.navigate('ParamedicsScreen')}>
                    <ImageBackground
                        source={require('../../../assets/images/logo.png')}
                        resizeMode="cover"
                        style={styles.image}
                        imageStyle={styles.image_imageStyle}>
                        <View style={styles.flex1} />
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>PÁRAMEDICOS</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={styles.separator}/>
                <TouchableOpacity style={[styles.box]} onPress={() => NavigationService.navigate('MessagesScreen')}>
                    <ImageBackground
                        source={require('../../../assets/images/logo.png')}
                        resizeMode="cover"
                        style={styles.image}
                        imageStyle={styles.image2_imageStyle}>
                        <View style={styles.flex1}/>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>MENSAJES</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.box} onPress={() => NavigationService.navigate('HospitalsScreen')}>
                    <ImageBackground
                        source={require('../../../assets/images/logo.png')}
                        resizeMode="cover"
                        style={styles.image}
                        imageStyle={styles.image4_imageStyle}>
                        <View style={styles.flex1}/>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>HOSPITALES</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={styles.separator}/>
                <TouchableOpacity style={styles.box} onPress={() => NavigationService.navigate('DrugstoresScreen')}>
                    <ImageBackground
                        source={require('../../../assets/images/logo.png')}
                        resizeMode="cover"
                        style={styles.image}
                        imageStyle={styles.image4_imageStyle}>
                        <View style={styles.flex1}/>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>FARMACIAS</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1
    },
    row: {
        height: 127,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
    box: {
        alignSelf: 'center',
        marginHorizontal: 12,
        flex: 1,
        backgroundColor: 'rgba(230, 230, 230,1)',
        elevation: 18,
        borderRadius: 5,
    },
    image: {
        flex: 1,
    },
    flex1: {
        flex: 1,
    },
    labelContainer: {
        height: 27,
        backgroundColor: 'rgba(21,19,19,0.5)',
        justifyContent: 'center',
        marginBottom: 1,
    },
    label: {
        color: 'rgba(247,252,253,1)',
        fontSize: 14,
        alignSelf: 'center',
    },
    separator: {
        width: 30,
        flexDirection: 'row',
    },
    button3: {
        width: 150,
        height: 127,
        backgroundColor: 'rgba(230, 230, 230,1)',
        elevation: 18,
        borderRadius: 5,
        overflow: 'hidden',
    },
    image2: {
        flex: 1,
    },
    rect82Filler: {
        flex: 1,
    },
    rect82: {
        height: 27,
        backgroundColor: 'rgba(21,19,19,0.5)',
        justifyContent: 'center',
    },
    actividades: {
        color: 'rgba(247,252,253,1)',
        fontSize: 14,
        alignSelf: 'center',
    },

    button4: {
        width: 150,
        height: 127,
        backgroundColor: 'rgba(230, 230, 230,1)',
        elevation: 18,
        borderRadius: 5,
        overflow: 'hidden',
    },
    rect83Filler: {
        flex: 1,
    },
    rect83: {
        height: 27,
        backgroundColor: 'rgba(21,19,19,0.5)',
        justifyContent: 'center',
    },
    loremIpsum4: {
        color: 'rgba(247,252,253,1)',
        fontSize: 14,
        alignSelf: 'center',
    },
    button4Filler: {
        flex: 1,
        flexDirection: 'row',
    },
    button5: {
        width: 150,
        height: 127,
        backgroundColor: 'rgba(230, 230, 230,1)',
        elevation: 18,
        borderRadius: 5,
        overflow: 'hidden',
    },
    image4: {
        flex: 1,
    },
    rect84Filler: {
        flex: 1,
    },
    rect84: {
        height: 27,
        backgroundColor: 'rgba(21,19,19,0.5)',
        marginBottom: 1,
    },
    contacto: {
        color: 'rgba(247,252,253,1)',
        fontSize: 14,
        marginTop: 7,
        alignSelf: 'center',
    },
    button4Row: {
        height: 127,
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
    },
});

export default Menu;
