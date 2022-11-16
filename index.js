import { AppRegistry } from 'react-native'
import App from './src/Router'
import { name as appName } from './app.json'
import Toast from 'react-native-toast-message'
import { toastConfig } from './src/screens/PopUpErroGenerico'
import { AuthProvider } from './src/apis/AuthContext'
import { Provider } from 'react-redux'
import { store, persistor } from './src/modules/redux/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { enableLatestRenderer } from 'react-native-maps'

enableLatestRenderer()

const Redux = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
                <Toast config={toastConfig} />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux)
