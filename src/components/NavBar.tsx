import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { config, cores } from '../styles/Estilos'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type Props = {
    titulo: string
    iconeEsq: IconDefinition
    iconeDir?: IconDefinition
    funcBtnEsq?: () => void
    funcBtnDir?: () => void
}

export default function NavBar({ titulo, iconeEsq, funcBtnEsq, iconeDir, funcBtnDir }: Props) {
    const navigation = useNavigation<any>()
    return (
        <View style={styles.navBar}>
            <View style={[styles.icone, { left: 15 }]}>
                <TouchableOpacity onPress={() => funcBtnEsq ? funcBtnEsq() : navigation.goBack()}>
                    <FontAwesomeIcon icon={iconeEsq} size={config.windowWidth / 12} color={cores.vermelho} />
                </TouchableOpacity>
            </View>
            <Text style={styles.titulo}>{titulo}</Text>
            {iconeDir &&
                <View style={[styles.icone, { right: 15 }]}>
                    <TouchableOpacity onPress={() => funcBtnDir ? funcBtnDir() : navigation.goBack()}>
                        <FontAwesomeIcon icon={iconeDir} size={config.windowWidth / 12} color={cores.vermelho} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        backgroundColor: cores.laranjaPrimario,
        paddingVertical: 13,
        justifyContent: 'center'
    },
    icone: {
        position: 'absolute',
        alignSelf: 'center'
    },
    titulo: {
        fontSize: 20,
        color: cores.vermelho,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})