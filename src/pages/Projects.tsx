import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projectService } from '../services/projectService'
import type { ProjectDto } from '../types/project'
import { useAuth } from '../auth/useAuth'

export default function Projects() {
    const { logout } = useAuth()
    const [projects, setProjects] = useState<ProjectDto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        projectService
            .getAll()
            .then(setProjects)
            .catch((e) => setError(e.message ?? 'Failed to load projects'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className= "page" >
        <header className="page-header" >
            <h1>Projects </h1>
            < div >
            <Link to="/dashboard" >← Dashboard </Link>
                < button onClick = { logout } style = {{ marginLeft: '1rem' }
}> Logout </button>
    </div>
    </header>

{ loading && <p>Loading…</p> }
{ error && <p className="error" > { error } </p> }

{
    !loading && !error && (
        <>
        <p>{ projects.length } project(s) </p>
            <ul>
    {
        projects.map((p) => (
            <li key= { p.id } >
            <strong>{ p.name } </strong>
                { p.description ? ` — ${p.description}` : '' }
            </li>
        ))
    }
    </ul>
        </>
      )
}
</div>
  )
}