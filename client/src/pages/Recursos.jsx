import { useCallback, useContext, useEffect, useState } from 'react'
import * as api from '../services/CodeYedServices'
import { AuthContext } from '../context/AuthContext'
import homeHero from '../assets/home.jpg'
import fallbackImage from '../assets/midudev_logo.jpg'

const Recursos = () => {
  const { user, token } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    title: '',
    resource: '',
    resource_url: '',
    image_url: '',
  })

  const isAdmin = user?.rol === 'admin'

  const load = useCallback(async () => {
    setLoading(true)
    const res = await api.getResources(token)
    setItems(Array.isArray(res) ? res : [])
    setLoading(false)
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onCreate = async (e) => {
    e.preventDefault()
    setMessage('')
    const payload = {
      title: form.title.trim(),
      resource: form.resource.trim(),
      resource_url: form.resource_url.trim(),
      image_url: form.image_url.trim() || undefined,
    }
    const res = await api.createResource(payload, token)
    if (res?.id) {
      setForm({ title: '', resource: '', resource_url: '', image_url: '' })
      setMessage('Recurso creado correctamente')
      await load()
      return
    }
    setMessage(res?.message || 'No se pudo crear el recurso')
  }

  const onDelete = async (id) => {
    if (!confirm('Eliminar recurso?')) return
    await api.deleteResource(id, token)
    load()
  }

  const onEdit = async (id) => {
    const title = prompt('Nuevo titulo del recurso')
    if (!title) return
    await api.updateResource(id, { title }, token)
    load()
  }

  const skeletonCards = Array.from({ length: 4 }, (_, index) => index)

  return (
    <div className="page-wrap">
      <section className="hero hero--compact" style={{ backgroundImage: `url(${homeHero})` }}>
        <div className="hero__overlay" />
        <div className="hero__content hero__content--center">
          <h1>RECURSOS PARA PROGRAMAR</h1>
        </div>
      </section>

      <section className="section" aria-labelledby="resources-title">
        <h2 id="resources-title">Recursos</h2>

        {isAdmin ? (
          <form className="admin-form" onSubmit={onCreate}>
            <input name="title" placeholder="Titulo" value={form.title} onChange={onChange} required />
            <input name="resource" placeholder="Descripcion corta" value={form.resource} onChange={onChange} required />
            <input name="resource_url" placeholder="URL del recurso" value={form.resource_url} onChange={onChange} required />
            <input name="image_url" placeholder="URL de imagen (opcional)" value={form.image_url} onChange={onChange} />
            <button type="submit" className="btn btn--primary">Crear recurso</button>
            {message ? <p className="form-message">{message}</p> : null}
          </form>
        ) : null}

        {loading ? (
          <div className="resource-grid grid-skeleton" aria-hidden="true">
            {skeletonCards.map((item) => (
              <article className="resource-card skeleton-card" key={`resource-skeleton-${item}`}>
                <div className="skeleton skeleton--image" />
                <div className="resource-card__body">
                  <div className="skeleton skeleton--line" />
                  <div className="skeleton skeleton--line skeleton--line-short" />
                  <div className="skeleton skeleton--line" />
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {!loading && !items.length ? (
          <div className="news-state">No hay recursos aun.</div>
        ) : null}

        <div className="resource-grid">
          {items.map((item) => (
            <article className="resource-card" key={item.id}>
              <img src={item.image_url || fallbackImage} alt={item.title || 'Recurso'} className="resource-card__image" />
              <div className="resource-card__body">
                <h3>{item.title}</h3>
                <p>{item.resource}</p>
                <a href={item.resource_url} target="_blank" rel="noreferrer" className="resource-card__link">
                  Ver recurso
                </a>
              </div>

              {isAdmin ? (
                <div className="news-card__actions">
                  <button className="btn btn--ghost" onClick={() => onEdit(item.id)}>Editar</button>
                  <button className="btn btn--danger" onClick={() => onDelete(item.id)}>Eliminar</button>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Recursos
