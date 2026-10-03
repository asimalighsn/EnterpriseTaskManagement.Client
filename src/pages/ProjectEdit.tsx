import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { projectService } from '../services/projectService'

export default function ProjectEdit() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
        projectService
            .getById(id)
            .then((p) => {
                setName(p.name)
                setDescription(p.description ?? '')
                setIsActive(p.isActive)
            })
            .catch((e) => setError((e as Error).message ?? 'Not found'))
            .finally(() => setLoading(false))
    }, [id])

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!id) return
        setError(null)
        setSaving(true)
        try {
            await projectService.update(id, {
                name: name.trim(),
                description: description.trim() || null,
                isActive,
            })
            navigate(`/projects/${id}`, { replace: true })
        } catch (err) {
            const msg =
                (err as { response?: { data?: { message?: string; title?: string } } })?.response?.data
                    ?.message ??
                (err as { response?: { data?: { title?: string } } })?.response?.data?.title ??
                'Failed to update project'
            setError(msg)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="page" > <p>Loading…</p></div >

  return (
        <div className= "page" >
        <header className="page-header" >
            <h1>Edit Project </h1>
                < Link to = {`/projects/${id}`
}>← Back </Link>
    </header>

    < form className = "form" onSubmit = { onSubmit } >
        <label>
        Name *
        <input
            value={ name }
onChange = {(e) => setName(e.target.value)}
required
maxLength = { 200}
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

    < label className = "checkbox" >
        <input
            type="checkbox"
checked = { isActive }
onChange = {(e) => setIsActive(e.target.checked)}
          />
Active
    </label>

{ error && <p className="error" > { error } </p> }

<div className="actions" >
    <button type="submit" disabled = { saving } className = "btn-primary" >
    { saving? 'Saving…': 'Save Changes' }
        </button>
        < Link to = {`/projects/${id}`}> Cancel </Link>
            </div>
            </form>
            </div>
  )
}