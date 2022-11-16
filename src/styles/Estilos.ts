import { Dimensions, StyleProp } from 'react-native';

const largura = Dimensions.get("window").width
const altura = Dimensions.get("window").height

const config = {
    windowWidth: largura,
    windowHeight: altura,
}

const cores = {
    backgroundPadrao: '#FFFFFF',
    disabled: 'rgba(255,255,255, 0.3)',
    laranjaPrimario: '#FF9C18',
    laranjaSecundario: '#E68B15',
    laranjaTerciario: '#BF7411',
    cinza: '#CCCCCC',
    cinzaEscuro: '#737B83',
    azul: '#0073B3',
    vermelho: '#DE1010',
    fontePadrao: '#181818',
}

const estilosGlobais: any = {
    containerPrincipal: {
        flex: 1,
        backgroundColor: cores.backgroundPadrao
    },
    txtListaVazia: {
        fontSize: 14,
        color: cores.fontePadrao,
        fontWeight: 'bold'
    }
}

export { config, cores, estilosGlobais }