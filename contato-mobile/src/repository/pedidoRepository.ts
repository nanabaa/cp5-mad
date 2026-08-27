import axios from 'axios';
import { Pedido } from '../model/Pedido';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URI = 'http://firebase.fiap.com/2tdspi/cp2/api';

const getAuthHeader = async () => {
    const token = await AsyncStorage.getItem('authToken');
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export const carregarPedidos = async (): Promise<Pedido[]> => {
    try {
        const config = await getAuthHeader();
        const response = await axios.get(URI, config);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        throw error;
    }
};

export const inserirPedido = async (pedido: Omit<Pedido, 'id'>): Promise<void> => {
    try {
        const config = await getAuthHeader();
        await axios.post(URI, pedido, config);
    } catch (error) {
        console.error("Erro ao cadastrar pedido:", error);
        throw error;
    }
};

export const atualizarPedido = async (id: number, pedido: Partial<Pedido>): Promise<void> => {
    try {
        const config = await getAuthHeader();
        await axios.put(`${URI}/${id}`, pedido, config);
    } catch (error) {
        console.error("Erro ao atualizar pedido:", error);
        throw error;
    }
};

export const deletarPedido = async (id: number): Promise<void> => {
    try {
        const config = await getAuthHeader();
        await axios.delete(`${URI}/${id}`, config);
    } catch (error) {
        console.error("Erro ao deletar pedido:", error);
        throw error;
    }
};