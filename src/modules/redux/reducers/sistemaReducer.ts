import { createSlice } from '@reduxjs/toolkit'

const initialStateS = {
    controleMinimizar: 'active',
    controleInternet: {
        conectado: true,
        tipoConexao: ""
    },
    splashScreenVisible: true,
    controleAlerta: false,
    mensagemAlerta: '',
}


const sistemaReducer = createSlice({
    name: 'system',
    initialState: initialStateS,

    reducers: {
        setInfoSistema(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        controleMinimizar(state, action) {
            state.controleMinimizar = action.payload
        },
        controleInternet(state, action) {
            state.controleInternet = action.payload
        },
        controleAlerta(state, action) {
            state.controleAlerta = !state.controleAlerta
            state.mensagemAlerta = action.payload
        },
        resetSystem: () => {
            return {
                ...initialStateS
            }
        }
    }
})

export const { setInfoSistema, controleMinimizar, controleInternet, controleAlerta, resetSystem } = sistemaReducer.actions

export default sistemaReducer.reducer