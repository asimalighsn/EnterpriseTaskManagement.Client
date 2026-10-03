import axios from 'axios'

const TOKEN_KEY = 'etm.token'

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
})

// Attach token to every request if we have one
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status

        if (status === 401) {
            // Token expired or invalid — clear and bounce to login
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem('etm.user')

            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
        }

        console.error('[API Error]', status, error.response?.data ?? error.message)
        return Promise.reject(error)
    }
)

export default api