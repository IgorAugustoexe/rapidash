import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { BASE_URL, KEY } from './config'
import { popUpErroGenerico } from '../screens/PopUpErroGenerico'
import { setInfo, resetUser } from '../modules/redux/reducers/usuarioReducer'
import { useDispatch, useSelector } from 'react-redux'

//Cria um contexto para ser utilizado pelos elementos filho
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const store = useSelector(({ user }) => {
        return {
            userDebug: user,
            user: user.user,
            accessToken: user.access_token,
        }
    })

    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({});
    const [isLogged, setIsLogged] = useState(false)

    //The axios configs
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    //Testar abaixo
    //  axios.interceptors.request.use(function (request ) {
    //      console.log('Starting Request', JSON.stringify(request, null, 2))
    //      return request;
    //  }, function (error) {
    //  	 return Promise.reject(error);
    //  });

    axios.interceptors.response.use(function (response) {
        console.log('Response:', JSON.stringify(response, null, 2))
        return response;
    }, function (error) {
        return Promise.reject(error);
    });

    //REGISTER
    const register = async (object, callback) => {
        const obj = {
            email: object.email,
            password: object.password,
            fullName: object.fullName,
            cpf: object.cpf,
            key: KEY
        }
        try {
            const aux = await axios.post(`/user`, obj);
            const req = await aux.data
            console.log(req)
            login(req.email, object.password, callback)
            popUpErroGenerico({ type: 'customSuccess', text1: 'Usuário cadastrado com sucesso', text2: `Por favor aguarde enquanto iniciamos a sua sessão` })
            return req
        } catch (e) {
            callback(false)
            console.log(`Error while registering user: ${e}`);
            popUpErroGenerico({ type: 'customError', text1: 'Alguma coisa aconteceu', text2: `Por favor verfique os dados: ${e.response.data.meta.target[0].replace(/['"]+/g, '').replace('fullName', 'Nome Completo')}, a sua conexão e tente novamente` })
            return e;
        }


    };

    const getUser = async (type, config) => {
        let userInfo = {}
        try {
            const aux = await axios.get(`/${type}`, config)
            const resp = await aux.data;
            userInfo = resp;
            return userInfo;
        } catch (e) {
            console.log(`Error while getting user: ${e}`)
            return;
        }

    }

    const login = async (email, password, callback) => {
        let userInfo = {};
        let aux;

        try {
            const res = await axios.post(`/auth`, { email, password });
            aux = await res.data;
            userInfo["access_token"] = aux.access_token;

            try {
                const config = { headers: { 'Authorization': `Bearer ${aux.access_token}` } };
                const resLogin = await getUser(`user`, config);

                userInfo['user'] = resLogin;
                setIsLogged(true)
                fullName = resLogin.fullName.split(' ')
                popUpErroGenerico({ type: 'customSuccess', text1: 'Sessão Iniciada com sucesso', text2: `Bem-Vindo{a) de volta ${fullName[0]}` })
                return userInfo;

            } catch (e) {
                console.log(`Error while getting user: ${e}`);
                popUpErroGenerico({ type: 'customError', text1: 'Alguma coisa aconteceu', text2: `Por favor verfique os dados, a sua conexão e tente novamente` })
                return;
            }

        } catch (e) {
            console.log(`Error while auth: ${e}`);
            popUpErroGenerico({ type: 'customError', text1: 'Alguma coisa aconteceu', text2: `Por favor verfique os dados, a sua conexão e tente novamente` })
            return;
        } finally {
            try {
                callback(false)
                dispatch(setInfo(userInfo))
            } catch (e) {
                console.log(`Login Finaly error: ${e}`)
                popUpErroGenerico({ type: 'customError', text1: 'Alguma coisa aconteceu', text2: `Por favor verfique os dados, a sua conexão e tente novamente` })
                return;
            }

        }

        //
        //const config = { headers: { 'Authorization': `Bearer ${aux.access_token}` } };// Previamente, será utilizado um token para autorização.
        //dispatch(funcaoStore(userInfo)); Para salvar o usuario na store
    };
    //LOGOUT
    const logout = () => {
        if (isLogged) {
            popUpErroGenerico({ type: 'customInfo', text1: 'Volte Novamente', text2: 'Usuário deslogado com sucesso' })
        }
        dispatch(resetUser())
        popUpErroGenerico({ type: 'customInfo', text1: 'Volte Novamente', text2: 'Usuário deslogado com sucesso' })

    };

    const isLoggedIn = async () => {


        if (store.accessToken) {

            try {
                const config = { headers: { 'Authorization': `Bearer ${store.accessToken}` } };

                const user = await getUser('user', config)
                if (!user) {
                    popUpErroGenerico({ type: 'customInfo', text1: 'Usuário Deslogado', text2: 'A sua sessão expirou, por favor, realize o login novamente' })
                    logout()
                } else {
                    fullName = store.user.fullName.split(' ')
                    popUpErroGenerico({ type: 'customInfo', text1: `Bem vindo de volta ${fullName[0]}`, text2: 'A equipe Rapidash te deseja um bom dia' })
                    setIsLogged(true)
                }


            } catch (e) {
                popUpErroGenerico({ type: 'customInfo', text1: 'Usuário Deslogado', text2: 'A sua sessão expirou, por favor, realize o login novamente' })
                console.log(`is logged in error ${e}`);
                logout()

            }

        }
    };

    useEffect(() => {
        if (store.accessToken && !isLogged) {
            isLoggedIn();
        }
    }, [store.accessToken]);

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                register,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};