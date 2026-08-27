import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pedido } from '../model/Pedido';

type Props = {
    item: Pedido;
    navigation: any;
};

export default function PedidoCard({ item, navigation }: Props) {
    const dataFormatada = item.dataPedido ? new Date(item.dataPedido).toLocaleDateString('pt-BR') : '';

    return (
        <TouchableOpacity style={estilo.card}>
            <Text style={estilo.texto}>Código: {item.codigo}</Text>
            <Text style={estilo.texto}>Valor Total: R$ {item.valorTotal?.toFixed(2) || '0,00'}</Text>
            <Text style={estilo.texto}>Desconto: {item.percentualDesconto || 0}%</Text>
            <Text style={estilo.texto}>Data: {dataFormatada}</Text>
        </TouchableOpacity>
    );
}

const estilo = StyleSheet.create({
    card: {
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    texto: { fontSize: 16 },
});