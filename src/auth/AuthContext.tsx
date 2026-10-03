import { createContext, useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { authService } from './authService'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth'

interface AuthContextValue {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (payload: LoginRequest) => Promise<void>
    register: (payload: RegisterRequest) => Promise<void>
    logout: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_KEY = 'etm.token'
const USER_KEY = 'etm.user'

function readStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
        return JSON.parse(raw) as User
    } catch {
        return null
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => readStoredUser())
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
    const [isLoading, setIsLoading] = useState(false)

    // Keep localStorage in sync
    useEffect(() => {
        if (token) localStorage.setItem(TOKEN_KEY, token)
        else localStorage.removeItem(TOKEN_KEY)
    }, [token])

    useEffect(() => {
        if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
        else localStorage.removeItem(USER_KEY)
    }, [user])

    const handleAuthSuccess = useCallback((res: AuthResponse) => {
        setToken(res.token || null)
        setUser({
            userId: res.userId,
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
        })
    }, [])

    const login = useCallback(
        async (payload: LoginRequest) => {
            setIsLoading(true)
            try {
                const res = await authService.login(payload)
                handleAuthSuccess(res)
            } finally {
                setIsLoading(false)
            }
        },
        [handleAuthSuccess]
    )

    const register = useCallback(async (payload: RegisterRequest) => {
        setIsLoading(true)
        try {
            await authService.register(payload)
            // Backend returns no token on register — user must log in separately
        } finally {
            setIsLoading(false)
        }
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUser(null)
    }, [])

    const value: AuthContextValue = {
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
    }

    return <AuthContext.Provider value={ value }> { children } </AuthContext.Provider>
}