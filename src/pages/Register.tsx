import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Register() {
    const { register, isLoading } = useAuth()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        try {
            await register({ firstName, lastName, email, password })
            setSuccess(true)
            setTimeout(() => navigate('/login'), 1500)
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                'Registration failed'
            setError(msg)
        }
    }

    return (
        <div className= "auth-page" >
        <form className="auth-card" onSubmit = { onSubmit } >
            <h1>Create account </h1>

                <label>
          First name
        < input value = { firstName } onChange = {(e) => setFirstName(e.target.value)
} required />
    </label>

    <label>
          Last name
    < input value = { lastName } onChange = {(e) => setLastName(e.target.value)} required />
        </label>

        <label>
Email
    < input
type = "email"
value = { email }
onChange = {(e) => setEmail(e.target.value)}
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
minLength = { 8}
autoComplete = "new-password"
    />
    </label>

{ error && <p className="error" > { error } </p> }
{ success && <p className="success" > Account created.Redirecting to login…</p> }

<button type="submit" disabled = { isLoading } >
{ isLoading? 'Creating…': 'Create account' }
    </button>

    < p className = "muted" >
        Already have an account ? <Link to="/login" > Sign in </Link>
            </p>
            </form>
            </div>
  )
}