import { createSlice } from '@reduxjs/toolkit'


const initialStateUser = {
    imgUser: ''
}

const usuarioReducer = createSlice({
    name: 'user',
    initialState: initialStateUser,

    /*  
        setInfo é uma Função genérica do reducer
        quando não quiser criar action pra alterar um atributo, utiliza essa função que altera direto no reducer
        exemplo de utilização:   
        dispatch(setInfo({nome: 'Jean' }))   vai atualizar direto no reducer o atributo nome
    */

    reducers: {
        setInfo(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        resetUser: () => {
            return {
                ...initialStateUser
            }
        }
    }
})

export const { setInfo, resetUser } = usuarioReducer.actions

export default usuarioReducer.reducer