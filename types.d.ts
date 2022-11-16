// declarar aqui tipos de arquivos a serem importados em paginas typescript

declare module '*.png' {
    import { ImageSourcePropType } from 'react-native'
    const value: ImageSourcePropType
    export default value
}

declare module '*.jpg' {
    import { ImageSourcePropType } from 'react-native'
    const value: ImageSourcePropType
    export default value
}

declare module '@env' {
    export const URL_SERVICES: string;
    export const URL_IMAGE: string;
}