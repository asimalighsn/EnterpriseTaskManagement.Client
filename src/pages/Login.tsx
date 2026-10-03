import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Login() {
    const { login, isLoading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const redirectTo =
        (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/dashboard'

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        try {
            await login({ email, password })
            navigate(redirectTo, { replace: true })
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                'Invalid email or password'
            setError(msg)
        }
    }

    return (
        <div className= "auth-page" >
        <form className="auth-card" onSubmit = { onSubmit } >
            <h1>Sign in </h1>

            <label>
    Email
        < input
    type = "email"
    value = { email }
    onChange = {(e) => setEmail(e.target.value)
}
required
autoComplete = "email"
    />
    </label>

    <label>
Password
    < input
type = "password"
value = { password }
onChange = {(e) => setPassword(e.target.value)}
required
autoComplete = "current-password"
    />
    </label>

{ error && <p className="error" > { error } </p> }

<button type="submit" disabled = { isLoading } >
{ isLoading? 'Signing in…': 'Sign in' }
    </button>

    < p className = "muted" >
        No account ? <Link to="/register" > Create one </Link>
            </p>
            </form>
            </div>
  )
}