import { PermissionsAndroid } from 'react-native'

export const requisitarPermissaoGaleria = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        )
        return granted
    } catch (err) {
        throw new Error(`erro ao requisitar a galeria: ${err}`)
    }
}

export const requisitarPermissaoLocalizacao = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
        return granted
    } catch (err) {
        throw new Error(`erro ao requisitar a localizacao: ${err}`)
    }
}

export const requisitarPermissaoArmazenamento = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        )
        return granted
    } catch (err) {
        throw new Error(`erro ao requisitar o armazenamento : ${err}`)
    }
}