import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URI = 'http://firebase.fiap.com/2tdspi/cp2/api/auth';

export const autenticar = async (email: string, senha: string): Promise<string> => {
    try {
        const response = await axios.post(URI, { email, senha });
        const token = response.data.token;
        await AsyncStorage.setItem('authToken', token);
        return token;
    } catch (error) {
        console.error("Erro ao autenticar:", error);
        throw new Error('Falha na autenticação');
    }
};

export const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem('authToken');
};