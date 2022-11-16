import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TelaLoginCadastro from './screens/TelaLoginCadastro'
import TelaEntregas from './screens/TelaEntregas'
import ConfirmarEntrega from './screens/ConfirmarEntrega'
import TelaDetalhesEntrega from './screens/TelaDetalhesEntrega'
import TelaEntregasDisponiveis from './screens/TelaEntregasDisponiveis'
import ModalErro from './screens/ModalErro'
import { cores } from './styles/Estilos'

const Stack = createNativeStackNavigator()

export default function App() {
    const store: any = useSelector<any>(({ user }) => {
        return {
            user: user
        }
    })

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