import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native'
import { config, cores } from '../styles/Estilos'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'

type navigation = {
    props: {
        dadosEntrega: object,
    }
}

export default function ConfirmarEntrega() {
    const navigation = useNavigation<any>()
    const route = useRoute<RouteProp<navigation, 'props'>>()

    const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off)

    const aoScannear = (resp: any) => {
        Linking.openURL(resp.data).catch(err =>
            console.error('An error occured', err)
        );
    }

    const controleFlashMode = () => {
        !flashMode ? setFlashMode(RNCamera.Constants.FlashMode.torch) : setFlashMode(RNCamera.Constants.FlashMode.off)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.containerAlert}>
                <View style={{ alignItems: 'center' }}>
                    <QRCodeScanner
                        onRead={aoScannear}
                        fadeIn
                        showMarker
                        flashMode={flashMode}
                        markerStyle={styles.formatoMarcador}
                        cameraStyle={styles.formatoCamera}
                        cameraType='back'
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: config.windowWidth / 1.15 }}>
                        <TouchableOpacity style={{}} onPress={() => controleFlashMode()}>
                            <FontAwesomeIcon icon={faLightbulb} size={config.windowWidth / 12} color={cores.backgroundPadrao} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faXmark} size={config.windowWidth / 12} color={cores.backgroundPadrao} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerAlert: {
        width: config.windowWidth / 1.1,
        height: config.windowWidth / 0.9,
        borderRadius: 7,
        backgroundColor: cores.backgroundPadrao,
        padding: 10,
        overflow: 'hidden'
    },
    btnConfirmarEntrega: {
        backgroundColor: cores.azul,
        padding: 10,
        borderRadius: 20
    },
    txtBtn: {
        color: cores.backgroundPadrao,
        fontWeight: 'bold'
    },
    formatoCamera: {
        opacity: 0.8,
        width: config.windowWidth,
        height
            : config.windowWidth
    },
    formatoMarcador: {
        borderColor: 'rgba(255,255,255,0.03)',
        borderRadius: 5,
        borderWidth: 3,
        backgroundColor: 'rgba(255,255,255,0.03)'
    },
})