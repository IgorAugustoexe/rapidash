import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTriangleExclamation, faCircleCheck, faBolt } from '@fortawesome/free-solid-svg-icons'
import { config } from '../styles/Estilos'

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 20,
                fontWeight: '400'
            }} text2Style={{
                fontSize: 16
            }}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: any) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 17
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    customSuccess: ({ text1, text2 }: any) => (
        <View style={styles.notificationWrapper}>
            <View style={styles.leftSideSuccess}>
                <FontAwesomeIcon icon={faCircleCheck} size={config.windowWidth / 13} color='#FFFFFF' />
            </View>
            <View style={styles.rightViewSuccess}>
                <Text style={styles.title}>{text1}</Text>
                <Text style={styles.message}>{text2}</Text>
            </View>
        </View>
    ),
    customError: ({ text1, text2 }: any) => (
        <View style={styles.notificationWrapper}>
            <View style={styles.leftSideError}>
                <FontAwesomeIcon icon={faTriangleExclamation} size={config.windowWidth / 13} color='#FFFFFF' />
            </View>
            <View style={styles.rightViewError}>
                <Text style={styles.title}>{text1}</Text>
                <Text style={styles.message}>{text2}</Text>
            </View>
        </View>
    ),
    customInfo: ({ text1, text2 }: any) => (
        <View style={styles.notificationWrapper}>
            <View style={styles.leftSideInfo}>
                <FontAwesomeIcon icon={faBolt} size={config.windowWidth / 13} color='#FFFFFF' />
            </View>
            <View style={styles.rightViewInfo}>
                <Text style={styles.title}>{text1}</Text>
                {text2 &&
                    <Text style={styles.message}>{text2}</Text>
                }

            </View>
        </View>
    )
};



export const popUpErroGenerico = (props: any) => {
    Toast.show({
        type: props.type,
        text1: props.text1,
        text2: props.text2,
    });
}

const styles = StyleSheet.create({

    notificationWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        backgroundColor: '#FFFFFF',
        color: 'white',
        borderRadius: 5,
        elevation: 20,
        shadowColor: '#000000',
    },
    rightViewInfo: {
        flex: 6,
        flexDirection: 'column',
        height: '100%',
        paddingHorizontal: '3%',
        borderTopColor: '#FF8A00',
        borderTopWidth: 2,
        paddingVertical: 7
    },
    leftSideInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: '1%',
        borderColor: '#FF8A00',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottompWidth: 2,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#FFA530',
        paddingVertical: 7,
        paddingHorizontal: 5
    },
    rightViewError: {
        flex: 6,
        flexDirection: 'column',
        height: '100%',
        paddingHorizontal: '3%',
        borderTopColor: '#FF0000',
        borderTopWidth: 2,
        paddingVertical: 7
    },
    leftSideError: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: '1%',
        borderColor: '#FF0000',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottompWidth: 2,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#FF3333',
        paddingVertical: 7,
        paddingHorizontal: 5
    },
    rightViewSuccess: {
        flex: 6,
        flexDirection: 'column',
        height: '100%',
        paddingHorizontal: '3%',
        borderTopColor: '#0A20BF',
        borderTopWidth: 2,
        paddingVertical: 7
    },
    leftSideSuccess: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: '1%',
        borderColor: '#0A20BF',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottompWidth: 2,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#0073B3',
        paddingVertical: 7,
        paddingHorizontal: 5
    },
    title: {
        fontSize: config.windowWidth / 23,
        color: '#3D3C3C',
        fontWeight: '900',

    },
    message: {
        fontSize: config.windowWidth / 25,
        color: '#585858',
        fontWeight: '600'

    }


})
