import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../services/CodeYedServices'
import { AuthContext } from '../context/AuthContext'
import homeHero from '../assets/home.jpg'

const toEmbedUrl = (url) => {
  if (!url) return ''

  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  return url
}

const Videos = () => {
  const { user, token } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ title: '', video_url: '', thumbnail: '' })

  const isAdmin = user?.rol === 'admin'

  const load = useCallback(async () => {
    setLoading(true)
    const res = await api.getVideos(token)
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
      video_url: form.video_url.trim(),
      thumbnail: form.thumbnail.trim() || undefined,
    }
    const res = await api.createVideo(payload, token)
    if (res?.id) {
      setForm({ title: '', video_url: '', thumbnail: '' })
      setMessage('Video creado correctamente')
      await load()
      return
    }
    setMessage(res?.message || 'No se pudo crear el video')
  }

  const onDelete = async (id) => {
    if (!confirm('Eliminar video?')) return
    await api.deleteVideo(id, token)
    load()
  }

  const onEdit = async (id) => {
    const title = prompt('Nuevo titulo del video')
    if (!title) return
    await api.updateVideo(id, { title }, token)
    load()
  }

  const renderedItems = useMemo(() => items.map((item) => ({
    ...item,
    embedUrl: toEmbedUrl(item.video_url),
  })), [items])

  return (
    <div className="page-wrap">
      <section className="hero hero--compact" style={{ backgroundImage: `url(${homeHero})` }}>
        <div className="hero__overlay" />
        <div className="hero__content hero__content--center">
          <h1>VIDEOS</h1>
        </div>
      </section>

      <section className="section" aria-labelledby="videos-title">
        <h2 id="videos-title">Javascript</h2>

        {isAdmin ? (
          <form className="admin-form" onSubmit={onCreate}>
            <input name="title" placeholder="Titulo" value={form.title} onChange={onChange} required />
            <input name="video_url" placeholder="URL del video" value={form.video_url} onChange={onChange} required />
            <input name="thumbnail" placeholder="URL de thumbnail (opcional)" value={form.thumbnail} onChange={onChange} />
            <small className="admin-form__hint">Thumbnail: imagen de portada opcional del video.</small>
            <button type="submit" className="btn btn--primary">Subir video</button>
            {message ? <p className="form-message">{message}</p> : null}
          </form>
        ) : null}

        {loading ? <div className="news-state">Cargando videos...</div> : null}

        {!loading && !renderedItems.length ? (
          <div className="news-state">No hay videos aun.</div>
        ) : null}

        <div className="video-grid">
          {renderedItems.map((item) => (
            <article className="video-card" key={item.id}>
              <div className="video-frame-wrap">
                <iframe
                  src={item.embedUrl}
                  title={item.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="video-card__body">
                <h3>{item.title}</h3>
                <small>autor: {item.user_id || 'admin'}</small>
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

export default Videos
