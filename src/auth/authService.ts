import api from '../services/api'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth'

export const authService = {
    login: async (payload: LoginRequest): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>('/auth/login', payload)
        return data
    },

    register: async (payload: RegisterRequest): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>('/auth/register', payload)
        return data
    },
}