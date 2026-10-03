import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { projectService } from '../services/projectService'
import type { ProjectDto } from '../types/project'

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [project, setProject] = useState<ProjectDto | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (!id) return
        projectService
            .getById(id)
            .then(setProject)
            .catch((e) => setError((e as Error).message ?? 'Not found'))
            .finally(() => setLoading(false))
    }, [id])

    async function handleDelete() {
        if (!project) return
        if (!confirm(`Delete project "${project.name}"?`)) return

        setDeleting(true)
        try {
            await projectService.delete(project.id)
            navigate('/projects', { replace: true })
        } catch (e) {
            alert('Failed to delete: ' + ((e as Error).message ?? 'unknown error'))
            setDeleting(false)
        }
    }

    if (loading) return <div className="page" > <p>Loading…</p></div >
  if (error) return <div className="page" > <p className="error" > { error } < /p></div >
  if (!project) return <div className="page" > <p>Not found.< /p></div >

  return (
        <div className= "page" >
        <header className="page-header" >
            <h1>{ project.name } </h1>
            < div className = "actions" >
                <Link to="/projects" >← Projects </Link>
                    < Link to = {`/projects/${project.id}/edit`
} className = "btn-primary" > Edit </Link>
    < button onClick = { handleDelete } disabled = { deleting } className = "btn-danger" >
    { deleting? 'Deleting…': 'Delete' }
        </button>
        </div>
        </header>

        < dl className = "detail-list" >
            <dt>ID </dt>
            < dd > <code>{ project.id } < /code></dd >

            <dt>Description </dt>
            < dd > { project.description ?? <span className="muted"> No description</ span >}</dd>

                < dt > Status </dt>
                < dd >
                <span className={ project.isActive ? 'badge badge-active' : 'badge badge-inactive' }>
                { project.isActive ? 'Active' : 'Inactive' }
                    </span>
                    </dd>

                    < dt > Created </dt>
                    < dd > { new Date(project.createdAt).toLocaleString() } </dd>
                    </dl>
                    </div>
  )
}