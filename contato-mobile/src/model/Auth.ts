import * as yup from 'yup';

export type Auth = {
    email: string;
    senha: string;
};

export const authSchema = yup.object({
    email: yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    senha: yup.string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
});