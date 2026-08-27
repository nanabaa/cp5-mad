import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carregarPedidos, inserirPedido } from '../repository/pedidoRepository';

export const usePedidoControl = () => {
    const [codigo, setCodigo] = useState('');
    const [percentualDesconto, setPercentualDesconto] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [dataPedido, setDataPedido] = useState('');
    
    const queryClient = useQueryClient();

    // Query para carregar pedidos
    const { data: lista = [], refetch, isLoading } = useQuery({
        queryKey: ['pedidos'],
        queryFn: carregarPedidos,
    });

    // Mutation para inserir pedido
    const mutation = useMutation({
        mutationFn: (pedido: any) => inserirPedido(pedido),
        onSuccess: () => {
            // Invalidar a query para atualizar a lista
            queryClient.invalidateQueries({ queryKey: ['pedidos'] });
            // Limpar formulário
            setCodigo('');
            setPercentualDesconto('');
            setValorTotal('');
            setDataPedido('');
        },
    });

    const inserir = async () => {
        try {
            const obj = {
                codigo,
                percentualDesconto: parseFloat(percentualDesconto),
                valorTotal: parseFloat(valorTotal),
                dataPedido: new Date(dataPedido),
            };
            await mutation.mutateAsync(obj);
        } catch (error) {
            console.error("Erro ao cadastrar pedido:", error);
        }
    };

    return {
        codigo, 
        setCodigo,
        percentualDesconto, 
        setPercentualDesconto,
        valorTotal, 
        setValorTotal,
        dataPedido, 
        setDataPedido,
        lista: lista as any[], // Forçar tipo para resolver erro do FlatList
        inserir,
        loading: mutation.isPending || isLoading,
        refetch,
    };
};