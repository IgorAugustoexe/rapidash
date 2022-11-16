import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { cores } from '../styles/Estilos'

type Props = {
    funcBtn: () => void
}

export default function ErroReq({ funcBtn }: Props) {
    return (
        <View style={styles.containerErroReq}>
            <Text style={[styles.txtErroReq, { fontWeight: 'bold', fontSize: 20 }]}>Erro ao carregar a página</Text>
            <Text style={styles.txtErroReq}>Por favor verifique sua conexão com a internet e tente novamente.</Text>
            <TouchableOpacity style={styles.btnErroReq} onPress={() => funcBtn()}>
                <Text style={styles.txtBtn}>Tentar Novamente</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerErroReq: {
        alignSelf: 'center',
        backgroundColor: cores.laranjaPrimario,
        padding: 15,
        borderRadius: 15
    },
    txtErroReq: {
        textAlign: 'center',
        color: cores.backgroundPadrao,
        fontSize: 16
    },
    btnErroReq: {
        alignSelf: 'center',
        backgroundColor: cores.azul,
        padding: 10,
        borderRadius: 20,
        marginTop: 10
    },
    txtBtn: {
        fontSize: 18,
        color: cores.backgroundPadrao,
        fontWeight: 'bold'
    }
})
