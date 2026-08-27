import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { usePedidoControl } from '../control/usePedidoControl';
import PedidoCard from '../components/PedidoCard';

type Props = {
    navigation: any;
};

export default function Listagem({ navigation }: Props) {
    const { lista, loading } = usePedidoControl();

    if (loading) {
        return (
            <View style={estilo.centered}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={estilo.container}>
            <FlatList
                data={lista}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <PedidoCard item={item} navigation={navigation} />
                )}
                ListEmptyComponent={
                    <Text style={estilo.empty}>Nenhum pedido encontrado</Text>
                }
            />
        </View>
    );
}

const estilo = StyleSheet.create({
    container: { flex: 1 },
    centered: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});