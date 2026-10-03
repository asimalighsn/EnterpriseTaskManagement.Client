import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projectService } from '../services/projectService'

export default function ProjectCreate() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setSaving(true)
        try {
            const created = await projectService.create({
                name: name.trim(),
                description: description.trim() || null,
            })
            navigate(`/projects/${created.id}`, { replace: true })
        } catch (err) {
            const msg =
                (err as { response?: { data?: { message?: string; title?: string } } })?.response?.data
                    ?.message ??
                (err as { response?: { data?: { title?: string } } })?.response?.data?.title ??
                'Failed to create project'
            setError(msg)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className= "page" >
        <header className="page-header" >
            <h1>New Project </h1>
                < Link to = "/projects" >← Back to Projects </Link>
                    </header>

                    < form className = "form" onSubmit = { onSubmit } >
                        <label>
                        Name *
                        <input
            value={ name }
    onChange = {(e) => setName(e.target.value)
}
required
maxLength = { 200}
autoFocus
    />
    </label>

    <label>
Description
    < textarea
value = { description }
onChange = {(e) => setDescription(e.target.value)}
rows = { 4}
maxLength = { 2000}
    />
    </label>

{ error && <p className="error" > { error } </p> }

<div className="actions" >
    <button type="submit" disabled = { saving } className = "btn-primary" >
    { saving? 'Creating…': 'Create Project' }
        </button>
        < Link to = "/projects" > Cancel </Link>
            </div>
            </form>
            </div>
  )
}