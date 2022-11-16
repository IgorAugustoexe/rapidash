import React, { Fragment, useState, useEffect, useRef, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, Animated, PermissionsAndroid, Alert, Linking } from 'react-native'
import { config, cores, estilosGlobais } from '../styles/Estilos'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faIdCard, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputMask } from 'react-native-masked-text'
import { removerAcento } from '../helpers/FuncoesPadrao'
import { AuthContext } from '../apis/AuthContext'
import { requisitarPermissaoArmazenamento, requisitarPermissaoLocalizacao } from '../controllers/PermissoesController'

export default function TelaLoginCadastro() {
    const navigation = useNavigation<any>()

    const sliceAnimation = useRef(new Animated.Value(-400)).current

    const [cadastro, setCadastro] = useState<boolean>(false)
    const [loaderBtn, setLoaderBtn] = useState<boolean>(false)

    const [loginEmail, setLoginEmail] = useState<string>('email@email.com')
    const [loginSenha, setLoginSenha] = useState<string>('senha@senha')

    const [cadastroEmail, setCadastroEmail] = useState<string>('')
    const [cadastroSenha, setCadastroSenha] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [nome, setNome] = useState<string>('')

    const [loginEmailInvalido, setLoginEmailInvalido] = useState<boolean>(false)
    const [loginSenhaInvalida, setLoginSenhaInvalida] = useState<boolean>(false)

    const [cadastroEmailInvalido, setCadastroEmailInvalido] = useState<boolean>(false)
    const [cadastroSenhaInvalida, setCadastroSenhaInvalida] = useState<boolean>(false)
    const [cpfInvalido, setCpfInvalido] = useState<boolean>(false)
    const [nomeInvalido, setNomeInvalido] = useState<boolean>(false)

    //const { register, login } = useContext(AuthContext)

    useEffect(() => {
        solicitarLocalizacao()
        solicitarArmazenamento()
    }, [])

    const solicitarLocalizacao = async () => {
        const permissaoLocalizacao = await requisitarPermissaoLocalizacao()
        if (permissaoLocalizacao != PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
                "Permissão da Localização",
                "Libere o acesso ao Urbniversity para acessar sua localização.",
                [
                    {
                        text: "Cancelar"
                    },
                    { text: "Liberar Acesso", onPress: () => Linking.openSettings() }
                ]
            )
        }
    }

    const solicitarArmazenamento = async () => {
        const permissaoArmazenamento = await requisitarPermissaoArmazenamento()
        if (permissaoArmazenamento != PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
                "Permissão de armazenamento",
                "Libere o acesso ao Urbniversity para acessar seu armazenamento.",
                [
                    {
                        text: "Cancelar"
                    },
                    { text: "Liberar Acesso", onPress: () => Linking.openSettings() }
                ]
            )
            return
        }
    }

    const controleSessao = () => {
        setCadastro(!cadastro)
        if (cadastro) {
            Animated.timing(sliceAnimation, {
                toValue: -400, duration: 750,
                useNativeDriver: false
            }).start()
            return
        }
        Animated.timing(sliceAnimation, {
            toValue: 0, duration: 750,
            useNativeDriver: false
        }).start()
    }

    const controleLoginCadastro = () => {
        navigation.navigate('entregas')
        setLoaderBtn(true)
        if (cadastro) {
            cadastroEmailInvalido && setCadastroEmailInvalido(false)
            cadastroSenhaInvalida && setCadastroSenhaInvalida(false)
            nomeInvalido && setNomeInvalido(false)
            cpfInvalido && setCpfInvalido(false)

            validarEmail(cadastroEmail, 1)
            validarSenha(cadastroSenha, 1)
            validarNome()
            validarCpf()

            if ((!validarEmail(cadastroEmail, 1)) || (!validarSenha(cadastroSenha, 1)) || (!validarNome()) || (!validarCpf())) {
                setLoaderBtn(false)
                return
            }
            fazerCadastro(setLoaderBtn)
            return
        }
        loginEmailInvalido && setLoginEmailInvalido(false)
        loginSenhaInvalida && setLoginSenhaInvalida(false)

        validarEmail(loginEmail, 0)
        validarSenha(loginSenha, 0)

        if ((!validarEmail(loginEmail, 0)) || (!validarSenha(loginSenha, 0))) {
            setLoaderBtn(false)
            return
        }
        fazerLogin(setLoaderBtn)
    }

    const validarEmail = (email: string, tipo: number) => {
        const reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!(reg.test(email.trim()))) {
            if (tipo == 0) {
                setLoginEmailInvalido(true)
                return false
            }
            setCadastroEmailInvalido(true)
            return false
        }
        return true
    }

    const validarSenha = (senha: string, tipo: number) => {
        if (senha.length <= 6) {
            if (tipo == 0) {
                setLoginSenhaInvalida(true)
                return false
            }
            setCadastroSenhaInvalida(true)
            return false
        }
        return true
    }

    const validarNome = () => {
        const reg = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi
        if (!(reg.test(nome.trim()))) {
            setNomeInvalido(true)
            return false
        }
        return true
    }

    const validarCpf = () => {
        const cpfFormatado = removerAcento(cpf)
        if (cpfFormatado.length <= 10) {
            setCpfInvalido(true)
            return false
        }
        return true
    }

    const fazerLogin = async (callback: any) => {
        // try {
        //     const resp = await login(loginEmail, loginSenha, callback)
        // } catch (e) {
        //     console.log(e)
        // }
    }

    const fazerCadastro = async (callback: any) => {
        // try {
        //     const resp = await register({
        //         email: cadastroEmail,
        //         password: cadastroSenha,
        //         fullName: nome,
        //         cpf: cpf
        //     }, callback)
        // } catch (e) {
        //     console.log(e);
        // }
    }

    // COMPONENTES

    const Cabecalho = () => (
        <View style={{ alignItems: 'center', marginTop: config.windowWidth / 10 }}>
            <Image
                source={require('../../assets/imgs/rapidashLogo.png')}
                style={{ width: 150, height: 150 }}
            />
            <Image
                source={require('../../assets/imgs/logo.png')}
                style={{ width: 300, height: 35 }}
            />
        </View>
    )

    const InputsLogin = () => (
        <View style={{ marginHorizontal: config.windowWidth / 10 }}>
            <View style={{ marginTop: config.windowWidth / 20 }}>
                <Text style={styles.txtInput}>Email</Text>
                <TextInput
                    value={loginEmail}
                    onChangeText={(text: string) => setLoginEmail(text)}
                    style={[styles.inputLogin, loginEmailInvalido && { borderColor: cores.vermelho }]}
                    onFocus={() => loginEmailInvalido && setLoginEmailInvalido(false)}
                    placeholder={'Digite seu Email'}
                    placeholderTextColor={cores.cinzaEscuro}
                />
                <FontAwesomeIcon icon={faEnvelope} size={config.windowWidth / 17} color={cores.cinzaEscuro} style={styles.iconeInput} />
                {loginEmailInvalido && <Text style={styles.txtErro}>Email Inválido</Text>}
            </View>
            <View style={{ marginTop: config.windowWidth / 20 }}>
                <Text style={styles.txtInput}>Senha</Text>
                <TextInput
                    value={loginSenha}
                    style={[styles.inputLogin, loginSenhaInvalida && { borderColor: cores.vermelho }]}
                    onFocus={() => loginSenhaInvalida && setLoginSenhaInvalida(false)}
                    onChangeText={(text: string) => setLoginSenha(text)}
                    placeholder={'Digite sua Senha'}
                    placeholderTextColor={cores.cinzaEscuro}
                />
                <FontAwesomeIcon icon={faKey} size={config.windowWidth / 17} color={cores.cinzaEscuro} style={styles.iconeInput} />
                {loginSenhaInvalida && <Text style={styles.txtErro}>Senha Inválida</Text>}
            </View>
        </View >
    )

    const Rodape = () => (
        <View style={styles.containerRodape}>
            <View style={{ marginVertical: config.windowWidth / 15 }}>
                <TouchableOpacity
                    style={[styles.bntRodape, cadastro && { backgroundColor: cores.azul }]}
                    activeOpacity={1}
                    disabled={loaderBtn}
                    onPress={() => controleLoginCadastro()}
                >
                    {loaderBtn ?
                        <ActivityIndicator size={'small'} color={cores.backgroundPadrao} style={{ paddingVertical: 16.5 }} />
                        :
                        <Text style={styles.txtBtn}>{cadastro ? 'Cadastrar' : 'Entrar'}</Text>
                    }

                </TouchableOpacity>
            </View>
            <Text style={styles.txtRodape}>{cadastro ? 'Já tem uma conta?' : 'Novo por aqui?'}
                <TouchableOpacity onPress={() => controleSessao()} disabled={loaderBtn}>
                    <Text style={{ top: 5, color: cadastro ? cores.laranjaPrimario : cores.azul }}> {cadastro ? 'Faça Login' : 'Crie sua Conta'}</Text>
                </TouchableOpacity>
            </Text>
        </View>
    )

    const SessaoCadastro = () => (
        <Fragment>
            <Animated.View style={[styles.containerSessaoCadastro, { transform: [{ translateY: sliceAnimation }] }]}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/imgs/logo.png')}
                        style={{ width: 350, height: 35 }}
                    />
                </View>
                <View style={{ marginHorizontal: config.windowWidth / 10 }}>
                    <View style={{ marginTop: config.windowWidth / 20 }}>
                        <Text style={[styles.txtInput, { color: cores.azul, fontWeight: '700' }]}>Email</Text>
                        <TextInput
                            value={cadastroEmail}
                            onChangeText={(text: string) => setCadastroEmail(text)}
                            style={[styles.inputCadastro, cadastroEmailInvalido && { borderColor: cores.vermelho }]}
                            onFocus={() => cadastroEmailInvalido && setCadastroEmailInvalido(false)}
                            placeholder={'Digite seu Email'}
                            placeholderTextColor={cores.cinzaEscuro}
                        />
                        <FontAwesomeIcon icon={faEnvelope} size={config.windowWidth / 17} color={cores.azul} style={styles.iconeInput} />
                        {cadastroEmailInvalido && <Text style={styles.txtErro}>Email Invalido</Text>}
                    </View>
                </View>
                <View style={{ marginHorizontal: config.windowWidth / 10 }}>
                    <View style={{ marginTop: config.windowWidth / 20 }}>
                        <Text style={[styles.txtInput, { color: cores.azul, fontWeight: '700' }]}>Senha</Text>
                        <TextInput
                            value={cadastroSenha}
                            onChangeText={(text: string) => setCadastroSenha(text)}
                            style={[styles.inputCadastro, cadastroSenhaInvalida && { borderColor: cores.vermelho }]}
                            onFocus={() => cadastroSenhaInvalida && setCadastroSenhaInvalida(false)}
                            placeholder={'Digite sua Senha'}
                            placeholderTextColor={cores.cinzaEscuro}
                        />
                        <FontAwesomeIcon icon={faKey} size={config.windowWidth / 17} color={cores.azul} style={styles.iconeInput} />
                        {cadastroSenhaInvalida && <Text style={styles.txtErro}>Email Invalido</Text>}
                    </View>
                </View>
                <View style={{ marginHorizontal: config.windowWidth / 10 }}>
                    <View style={{ marginTop: config.windowWidth / 20 }}>
                        <Text style={[styles.txtInput, { color: cores.azul, fontWeight: '700' }]}>Nome Completo</Text>
                        <TextInput
                            value={nome}
                            onChangeText={(text: string) => setNome(text)}
                            style={[styles.inputCadastro, nomeInvalido && { borderColor: cores.vermelho }]}
                            onFocus={() => nomeInvalido && setNomeInvalido(false)}
                            placeholder={'Digite seu Nome'}
                            placeholderTextColor={cores.cinzaEscuro}
                        />
                        <FontAwesomeIcon icon={faUser} size={config.windowWidth / 17} color={cores.azul} style={styles.iconeInput} />
                        {nomeInvalido && <Text style={styles.txtErro}>Nome Inválido</Text>}
                    </View>
                </View>
                <View style={{ marginHorizontal: config.windowWidth / 10 }}>
                    <View style={{ marginTop: config.windowWidth / 20 }}>
                        <Text style={[styles.txtInput, { color: cores.azul, fontWeight: '700' }]}>CPF</Text>
                        <TextInputMask
                            type={'cpf'}
                            value={cpf}
                            onChangeText={(text: string) => setCpf(text)}
                            style={[styles.inputCadastro, cpfInvalido && { borderColor: cores.vermelho }]}
                            onFocus={() => cpfInvalido && setCpfInvalido(false)}
                            placeholder={'Digite seu CPF'}
                            placeholderTextColor={cores.cinzaEscuro}
                            maxLength={14}
                        />
                        <FontAwesomeIcon icon={faIdCard} size={config.windowWidth / 17} color={cores.azul} style={styles.iconeInput} />
                        {cpfInvalido && <Text style={styles.txtErro}>CPF Inválido</Text>}
                    </View>
                </View>
            </Animated.View>
        </Fragment>
    )

    return (
        <View style={estilosGlobais.containerPrincipal}>
            <KeyboardAwareScrollView
                extraHeight={config.windowWidth / 2}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
            >
                <Cabecalho />
                {InputsLogin()}
                {SessaoCadastro()}
                <Rodape />
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    //Cabecalho
    txtTitulo: {
        fontSize: 40,
        color: cores.vermelho,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    //InputsLogin
    txtInput: {
        left: 10,
        fontSize: 14,
        color: cores.laranjaSecundario,
        fontWeight: '700'
    },
    inputLogin: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 5,
        borderColor: cores.laranjaSecundario,
        color: cores.fontePadrao
    },
    iconeInput: {
        position: 'absolute',
        bottom: 8,
        right: 8
    },
    //Rodape
    containerRodape: {
        position: 'relative',
        marginTop: config.windowWidth / 25,
        alignSelf: 'center',
        width: '100%'
    },
    bntRodape: {
        alignItems: 'center',
        backgroundColor: cores.laranjaPrimario,
        marginHorizontal: config.windowWidth / 5,
        borderRadius: 15
    },
    txtBtn: {
        paddingVertical: 13,
        color: cores.backgroundPadrao,
        fontSize: 20,
        fontWeight: 'bold'
    },
    txtRodape: {
        fontSize: 14,
        color: cores.fontePadrao,
        textAlign: 'center'
    },
    //SessaoCadastro
    containerSessaoCadastro: {
        position: 'absolute',
        backgroundColor: cores.laranjaPrimario,
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 10,
        paddingBottom: config.windowWidth / 5
    },
    inputCadastro: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderBottomLeftRadius: 5,
        padding: 4,
        borderColor: cores.azul
    },
    txtErro: {
        color: cores.vermelho,
        fontSize: 11,
        position: 'absolute',
        bottom: -15,
        right: 10
    }
})