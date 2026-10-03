// Matches backend: LoginRequestDto
export interface LoginRequest {
    email: string
    password: string
}

// Matches backend: RegisterRequestDto
export interface RegisterRequest {
    firstName: string
    lastName: string
    email: string
    password: string
}

// Matches backend: AuthResponseDto
export interface AuthResponse {
    userId: string
    email: string
    firstName: string
    lastName: string
    token: string
}

// Client-side user (derived from AuthResponse, minus token)
export interface User {
    userId: string
    email: string
    firstName: string
    lastName: string
}