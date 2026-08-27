import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { authSchema } from '../model/Auth';
import { autenticar } from '../repository/authRepository';

type Props = {
    navigation: any;
    onLoginSuccess: () => void;
};

export default function Login({ navigation, onLoginSuccess }: Props) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            // Validar dados com Yup
            await authSchema.validate({ email, senha });
            
            setLoading(true);
            
            // Autenticar
            const token = await autenticar(email, senha);
            
            setLoading(false);
            onLoginSuccess();
            
        } catch (error: any) {
            setLoading(false);
            
            if (error.name === 'ValidationError') {
                Alert.alert('Erro de validação', error.message);
            } else {
                Alert.alert('Erro', 'Email ou senha inválidos');
            }
        }
    };

    return (
        <View style={estilo.container}>
            <Text style={estilo.titulo}>Login</Text>
            
            <Text style={estilo.label}>Email</Text>
            <TextInput 
                style={estilo.input} 
                value={email} 
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Digite seu email"
            />

            <Text style={estilo.label}>Senha</Text>
            <TextInput 
                style={estilo.input} 
                value={senha} 
                onChangeText={setSenha}
                secureTextEntry
                placeholder="Digite sua senha"
            />

            <Button 
                title={loading ? 'Entrando...' : 'Entrar'} 
                onPress={handleLogin}
                disabled={loading}
            />
            
            {loading && (
                <ActivityIndicator style={estilo.loading} size="small" color="#007bff" />
            )}
        </View>
    );
}

const estilo = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    label: { 
        marginTop: 12, 
        marginBottom: 4, 
        fontWeight: 'bold' 
    },
    input: { 
        borderWidth: 1, 
        borderColor: '#ccc', 
        padding: 8, 
        borderRadius: 4,
        marginBottom: 8,
    },
    loading: {
        marginTop: 16,
    },
});