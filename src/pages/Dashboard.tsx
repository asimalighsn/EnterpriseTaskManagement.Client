import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Dashboard() {
    const { user, logout } = useAuth()

    return (
        <div className= "page" >
        <header className="page-header" >
            <h1>Dashboard </h1>
            < button onClick = { logout } > Logout </button>
                </header>

                <p>
    Welcome, <strong>{ user?.firstName } { user?.lastName } </strong>
        </p>
        < p className = "muted" > { user?.email } </p>

            < nav >
            <Link to="/projects" > Go to Projects →</Link>
                </nav>
                </div>
  )
}