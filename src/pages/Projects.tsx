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
    const [deletingId, setDeletingId] = useState<string | null>(null)

    async function load() {
        setLoading(true)
        setError(null)
        try {
            const data = await projectService.getAll()
            setProjects(data)
        } catch (e) {
            setError((e as Error).message ?? 'Failed to load projects')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    async function handleDelete(id: string, name: string) {
        if (!confirm(`Delete project "${name}"? This cannot be undone.`)) return

        setDeletingId(id)
        try {
            await projectService.delete(id)
            setProjects((prev) => prev.filter((p) => p.id !== id))
        } catch (e) {
            alert('Failed to delete: ' + ((e as Error).message ?? 'unknown error'))
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className= "page" >
        <header className="page-header" >
            <h1>Projects </h1>
            < div className = "actions" >
                <Link to="/dashboard" >← Dashboard </Link>
                    < Link to = "/projects/new" className = "btn-primary" >
                        + New Project
                            </Link>
                            < button onClick = { logout } > Logout </button>
                                </div>
                                </header>

    { loading && <p>Loading…</p> }
    { error && <p className="error" > { error } </p> }

    {
        !loading && !error && projects.length === 0 && (
            <p className="muted" >
                No projects yet. < Link to = "/projects/new" > Create your first one </Link>.
                    </p>
      )
    }

    {
        !loading && !error && projects.length > 0 && (
            <table className="data-table" >
                <thead>
                <tr>
                <th>Name </th>
                < th > Description </th>
                < th > Status </th>
                < th > Created </th>
                < th > </th>
                </tr>
                </thead>
                <tbody>
        {
            projects.map((p) => (
                <tr key= { p.id } >
                <td>
                <Link to={`/projects/${p.id}`}>
                    <strong>{ p.name } </strong>
                    </Link>
                    </td>
                    < td > { p.description ?? <span className="muted">—< /span>}</td >
                    <td>
                    <span className={ p.isActive ? 'badge badge-active' : 'badge badge-inactive' }>
                    { p.isActive ? 'Active' : 'Inactive' }
                        </span>
                        </td>
                        < td > { new Date(p.createdAt).toLocaleDateString() } </td>
                        < td className = "row-actions" >
                            <Link to={ `/projects/${p.id}/edit` }> Edit </Link>
                                < button
        onClick = {() => handleDelete(p.id, p.name)
    }
    disabled = { deletingId === p.id
}
className = "link-danger"
    >
{ deletingId === p.id ? 'Deleting…' : 'Delete'}
</button>
    </td>
    </tr>
            ))}
</tbody>
    </table>
      )}
</div>
  )
}