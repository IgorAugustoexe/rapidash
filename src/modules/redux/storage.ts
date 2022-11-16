import { reduxStorage } from '../MMKV-storage/redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, PERSIST } from 'redux-persist'
import usuarioReducer from './reducers/usuarioReducer'
import sistemaReducer from './reducers/sistemaReducer'

const userPersistConfig = {
    key: 'user',
    storage: reduxStorage
}

// const cartPersistConfig = {
//     key: 'cart',
//     storage: reduxStorage,
//     blacklist: ['cupom', 'deliveryPeriod', 'deliveryDate']
// };

export const store: any = configureStore({
    reducer: {
        user: persistReducer(userPersistConfig, usuarioReducer),
        system: sistemaReducer
    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            // serializableCheck: false
            serializableCheck: {
                ignoredActions: [PERSIST],
            }
        })
})

export const persistor = persistStore(store)
