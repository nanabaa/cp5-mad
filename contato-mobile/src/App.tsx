import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePedidoControl } from '../src/control/usePedidoControl';
import Formulario from '../src/screen/Formulario';
import Listagem from '../src/screen/Listagem';
import Login from '../src/screen/Login';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const {
        codigo, setCodigo,
        percentualDesconto, setPercentualDesconto,
        valorTotal, setValorTotal,
        dataPedido, setDataPedido,
        inserir,
    } = usePedidoControl();

    if (loading) {
        return (
            <View style={estilo.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={estilo.loadingText}>Carregando...</Text>
            </View>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <View style={estilo.container}>
                    <View style={estilo.header}>
                        <Text style={estilo.titulo}>Gerenciamento de Pedidos</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {isAuthenticated ? (
                            <Tab.Navigator screenOptions={{ headerShown: false }}>
                                <Tab.Screen name="Formulário">
                                    {(props: any) => (
                                        <Formulario
                                            {...props}
                                            codigo={codigo}
                                            setCodigo={setCodigo}
                                            percentualDesconto={percentualDesconto}
                                            setPercentualDesconto={setPercentualDesconto}
                                            valorTotal={valorTotal}
                                            setValorTotal={setValorTotal}
                                            dataPedido={dataPedido}
                                            setDataPedido={setDataPedido}
                                            inserir={inserir}
                                        />
                                    )}
                                </Tab.Screen>

                                <Tab.Screen name="Listagem">
                                    {(props: any) => (
                                        <Listagem {...props} />
                                    )}
                                </Tab.Screen>
                            </Tab.Navigator>
                        ) : (
                            <Login 
                                navigation={{} as any} 
                                onLoginSuccess={handleLoginSuccess} 
                            />
                        )}
                    </View>
                </View>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

const estilo = StyleSheet.create({
    container: { flex: 1 },
    header: {
        backgroundColor: '#007bff',
        padding: 16,
        alignItems: 'center',
    },
    titulo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
});