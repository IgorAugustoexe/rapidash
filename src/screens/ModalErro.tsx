import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { config, cores } from '../styles/Estilos'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

type navigation = {
    props: {
        icone: IconDefinition,
        texto?: string
        btnTxt?: string
        btn1Func?: () => void
        btn2Txt?: string
        btn2Func?: () => void
    }
}

export default function ModalErro() {
    const navigation = useNavigation<any>()
    const route = useRoute<RouteProp<navigation, 'props'>>()

    const { icone, texto, btnTxt, btn2Txt, btn1Func, btn2Func } = { ...route.params }

    const onPressLeft = () => {
        navigation.goBack()
        if (btn1Func) {
            btn1Func()
        }
    }

    const onPressRight = () => {
        navigation.goBack()
        if (btn2Func) {
            btn2Func()
        }
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={styles.containerAlert}>
                <View style={styles.containerTxtPrincipal}>
                    <FontAwesomeIcon icon={icone} size={config.windowWidth / 10} color={cores.azul} />
                    <Text style={styles.txtAviso}>{texto || 'Ocorreu um erro ao realizar esta operação, por favor verifique sua conexão e tente novamente.'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => onPressLeft()} style={[styles.botoes, !btn2Txt && { width: '100%' }]} hitSlop={{ top: 10 }}>
                        <Text style={[styles.txtAviso, { color: cores.fontePadrao, fontWeight: '600' }]}>{btnTxt || 'OK'}</Text>
                    </TouchableOpacity>
                    {btn2Txt &&
                        <TouchableOpacity onPress={() => onPressRight()} style={styles.botoes} hitSlop={{ top: 10 }}>
                            <Text style={[styles.txtAviso, { color: cores.fontePadrao, fontWeight: '600' }]}>{btn2Txt}</Text>
                        </TouchableOpacity>
                    }

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerAlert: {
        width: config.windowWidth / 1.2,
        borderRadius: 5,
        backgroundColor: '#FFF',
        overflow: 'hidden'
    },
    containerTxtPrincipal: {
        paddingTop: config.windowWidth / 22,
        paddingBottom: config.windowWidth / 19,
        alignItems: 'center'
    },
    txtAviso: {
        color: cores.fontePadrao,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        maxWidth: '85%'
    },
    botoes: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        paddingVertical: 12,
        borderColor: cores.cinzaEscuro
    }
})