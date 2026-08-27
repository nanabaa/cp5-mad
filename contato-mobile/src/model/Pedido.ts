import * as yup from 'yup';

export type Pedido = {
    id: number;
    codigo: string;
    percentualDesconto: number;
    valorTotal: number;
    dataPedido: Date;
};

export const pedidoSchema = yup.object({
    codigo: yup.string().required('Código é obrigatório'),
    percentualDesconto: yup.number().required('Percentual de desconto é obrigatório'),
    valorTotal: yup.number().required('Valor total é obrigatório'),
    dataPedido: yup.date().required('Data do pedido é obrigatória'),
});
