import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
    codigo: string;
    setCodigo: (v: string) => void;
    percentualDesconto: string;
    setPercentualDesconto: (v: string) => void;
    valorTotal: string;
    setValorTotal: (v: string) => void;
    dataPedido: string;
    setDataPedido: (v: string) => void;
    inserir: () => void;
    navigation: any;
};

export default function Formulario({
    codigo, setCodigo,
    percentualDesconto, setPercentualDesconto,
    valorTotal, setValorTotal,
    dataPedido, setDataPedido,
    inserir,
    navigation,
}: Props) {
    return (
        <View style={estilo.container}>
            <Text style={estilo.label}>Código</Text>
            <TextInput style={estilo.input} value={codigo} onChangeText={setCodigo} />

            <Text style={estilo.label}>Percentual de Desconto</Text>
            <TextInput style={estilo.input} value={percentualDesconto}
                onChangeText={setPercentualDesconto} keyboardType="numeric" />

            <Text style={estilo.label}>Valor Total</Text>
            <TextInput style={estilo.input} value={valorTotal}
                onChangeText={setValorTotal} keyboardType="numeric" />

            <Text style={estilo.label}>Data do Pedido</Text>
            <TextInput style={estilo.input} value={dataPedido}
                onChangeText={setDataPedido} placeholder="YYYY-MM-DD" />

            <Button title="Cadastrar" onPress={inserir} />
        </View>
    );
}

const estilo = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { marginTop: 12, marginBottom: 4, fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 },
});
