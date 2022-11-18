import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, PermissionsAndroid, Alert, Linking } from 'react-native'
import { config, cores, estilosGlobais } from '../styles/Estilos'
import { faArrowLeft, faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { requisitarPermissaoCamera } from '../controllers/PermissoesController'

type navigation = {
    props: {
        dadosEntrega: any,
        local: any
    }
}

export default function TelaDetalhesEntrega() {
    const navigation = useNavigation<any>()
    const route = useRoute<RouteProp<navigation, 'props'>>()

    const infoEntrega = useRef<any>(route.params.dadosEntrega).current

    const latitudeDelta = useRef<number>(0.0922).current
    const longitudeDelta = useRef<number>(0.0421).current

    const [localUsuario, setLocalUsuario] = useState<any>({})
    const [destino, setDestino] = useState<any>()

    useEffect(() => {
        didMount()
    }, [])

    const didMount = () => {
        setDestino({
            latitude: route.params.dadosEntrega.lat,
            longitude: route.params.dadosEntrega.lon,
            latitudeDelta,
            longitudeDelta
        })
        if (route.params.local.latitude && route.params.local.longitude) {
            setLocalUsuario(route.params.local)
            return
        }
        setLocalUsuario({
            latitude: route.params.dadosEntrega.lat,
            longitude: route.params.dadosEntrega.lon,
            latitudeDelta,
            longitudeDelta
        })
    }

    const solicitarCamera = async () => {
        const permissaoArmazenamento = await requisitarPermissaoCamera()
        if (permissaoArmazenamento != PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
                "Permissão de armazenamento",
                "Libere o acesso ao Urbniversity para acessar sua camera.",
                [
                    {
                        text: "Cancelar"
                    },
                    { text: "Liberar Acesso", onPress: () => Linking.openSettings() }
                ]
            )
        }
    }


    // COMPONENTES

    const DetalhesEntrega = () => (
        <View style={styles.containerDetalhesEntrega}>
            <View style={styles.containerCodPedido}>
                <Text style={styles.txtAzul}>#{infoEntrega.codPedido}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <FontAwesomeIcon icon={faUser} size={config.windowWidth / 20} color={cores.azul} />
                <Text style={[styles.txtAzul, { left: 5 }]}>Destinatário</Text>
            </View>
            <Text style={styles.txtPadrao} numberOfLines={1}>{infoEntrega.destinatario}</Text>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <FontAwesomeIcon icon={faLocationDot} size={config.windowWidth / 20} color={cores.azul} />
                <Text style={[styles.txtAzul, { left: 5 }]}>Endereço</Text>
            </View>
            <Text style={styles.txtPadrao} numberOfLines={1}>{infoEntrega.logradouro}, {infoEntrega.numero}, {infoEntrega.bairro}</Text>
            <Text style={styles.txtPadrao} numberOfLines={1}>{infoEntrega.cidade} / {infoEntrega.uf}</Text>
            <TouchableOpacity style={styles.btnConfirmar} activeOpacity={0.9} onPress={() => navigation.navigate('confirmarEntrega')}>
                <Text style={styles.txtBtn}>Confirmar Entrega</Text>
            </TouchableOpacity>
        </View>
    )

    const Mapa = () => (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={destino}
                minZoomLevel={1} // minimo de zoom no mapa
                showsUserLocation // mostrar localização do user
                showsMyLocationButton // precisa do Shows userLocation
                userLocationPriority='high' // precisão da localização
                showsCompass // mostra bússola canto superiror esquerdo
                //showsTraffic // mostrar tráfego na região
                loadingEnabled
                //onUserLocationChange={(e) => setOrigem(e.nativeEvent.coordinate)}
                zoomEnabled
                zoomControlEnabled
            >
                <Marker
                    coordinate={destino}
                />

                {(route.params.local.latitude && route.params.local.longitude) &&
                    <MapViewDirections
                        apikey={'AIzaSyCff_T9kaWmUkjKtS37Me0ypoIL--Nxksg'}
                        origin={localUsuario}
                        destination={destino}
                        strokeColor="#3399CC" // cor da linha
                        strokeWidth={2} // grossura da linha
                    />
                }
            </MapView>
        </View >
    )

    return (
        <View style={estilosGlobais.containerPrincipal}>
            <NavBar titulo={'Encomenda'} iconeEsq={faArrowLeft} />
            <DetalhesEntrega />
            <Mapa />
        </View>
    )

}

const styles = StyleSheet.create({
    containerDetalhesEntrega: {
        marginVertical: config.windowWidth / 10,
        marginHorizontal: config.windowWidth / 20,
        backgroundColor: 'rgba(255, 156, 24, 0.7)',
        padding: config.windowWidth / 15,
        borderRadius: 10
    },
    txtAzul: {
        fontSize: 16,
        color: cores.azul,
        fontWeight: 'bold'
    },
    txtPadrao: {
        fontSize: 14,
        color: cores.fontePadrao,
        fontWeight: '700'
    },
    containerCodPedido: {
        position: 'absolute',
        backgroundColor: cores.laranjaSecundario,
        padding: 7,
        top: -20,
        left: 15,
        borderRadius: 5
    },
    btnMapa: {
        width: '30%',
        alignItems: 'center',
        backgroundColor: cores.laranjaSecundario,
        padding: 5,
        borderRadius: 10,
    },
    btnConfirmar: {
        position: 'absolute',
        backgroundColor: cores.azul,
        padding: 10,
        bottom: -25,
        right: 15,
        borderRadius: 10
    },
    txtBtn: {
        fontSize: 16,
        color: cores.backgroundPadrao,
        fontWeight: 'bold'
    },

    container: {
        flex: 1,
        backgroundColor: cores.backgroundPadrao,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '100%'
    }
})