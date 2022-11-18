import React from 'react'
import { LogBox } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TelaLoginCadastro from './screens/TelaLoginCadastro'
import TelaEntregas from './screens/TelaEntregas'
import ConfirmarEntrega from './screens/ConfirmarEntrega'
import TelaDetalhesEntrega from './screens/TelaDetalhesEntrega'
import TelaEntregasDisponiveis from './screens/TelaEntregasDisponiveis'
import ModalErro from './screens/ModalErro'

LogBox.ignoreLogs(['Failed prop type: Invalid prop `origin` supplied to `MapViewDirections`, expected one of type [string]'])

const Stack = createNativeStackNavigator()

export default function App() {
    const store: any = useSelector<any>(({ user }) => {
        return {
            user: user
        }
    })

    const forFade = ({ current }: any) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!store.user.access_token ?
                    <>
                        <Stack.Screen
                            name="entregas"
                            component={TelaEntregas}
                        />
                        <Stack.Screen
                            name="disponiveis"
                            component={TelaEntregasDisponiveis}
                        />
                        <Stack.Screen
                            name="detalhesEntrega"
                            component={TelaDetalhesEntrega}
                        />
                        <Stack.Screen
                            name="confirmarEntrega"
                            component={ConfirmarEntrega}
                            options={{
                                presentation: 'transparentModal',
                                animation: 'fade'
                            }}
                        />
                        <Stack.Screen
                            name="modalerro"
                            component={ModalErro}
                            options={{
                                presentation: 'transparentModal',
                                animation: 'fade'
                            }}
                        />
                    </>
                    :
                    <Stack.Screen
                        name="loginCadastro"
                        component={TelaLoginCadastro}
                    />

                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}