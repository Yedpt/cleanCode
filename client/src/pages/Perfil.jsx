import { Navigate } from 'react-router-dom'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import * as api from '../services/CodeYedServices'

const tabs = [
  { key: 'usuarios', label: 'Usuarios', adminOnly: true },
  { key: 'noticias', label: 'Noticias', adminOnly: false },
  { key: 'videos', label: 'Videos', adminOnly: false },
  { key: 'recursos', label: 'Recursos para programar', adminOnly: false },
]

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

const Perfil = () => {
  const { user, token, logout } = useContext(AuthContext)
  const isAdmin = user?.rol === 'admin'

  const visibleTabs = useMemo(
    () => tabs.filter((tab) => (tab.adminOnly ? isAdmin : true)),
    [isAdmin],
  )

  const [activeTab, setActiveTab] = useState(isAdmin ? 'usuarios' : 'noticias')
  const [loading, setLoading] = useState(false)
  const [panelMessage, setPanelMessage] = useState('')

  const [users, setUsers] = useState([])
  const [news, setNews] = useState([])
  const [videos, setVideos] = useState([])
  const [resources, setResources] = useState([])

  const [newsForm, setNewsForm] = useState({ title: '', news: '', image_url: '' })
  const [videoForm, setVideoForm] = useState({ title: '', video_url: '', thumbnail: '' })
  const [resourceForm, setResourceForm] = useState({ title: '', resource: '', resource_url: '', image_url: '' })

  const loadActiveTab = useCallback(async () => {
    setLoading(true)
    setPanelMessage('')

    if (activeTab === 'usuarios') {
      if (!isAdmin) {
        setUsers([])
        setPanelMessage('No tienes permisos para gestionar usuarios.')
        setLoading(false)
        return
      }

      const res = await api.getUsers(token)
      if (Array.isArray(res)) {
        setUsers(res)
      } else {
        setUsers([])
        setPanelMessage(res?.message || 'No se pudieron cargar los usuarios')
      }
      setLoading(false)
      return
    }

    if (activeTab === 'noticias') {
      const res = await api.getNews(token)
      if (Array.isArray(res)) {
        setNews(res)
      } else {
        setNews([])
        setPanelMessage(res?.message || 'No se pudieron cargar las noticias')
      }
      setLoading(false)
      return
    }

    if (activeTab === 'videos') {
      const res = await api.getVideos(token)
      if (Array.isArray(res)) {
        setVideos(res)
      } else {
        setVideos([])
        setPanelMessage(res?.message || 'No se pudieron cargar los videos')
      }
      setLoading(false)
      return
    }

    const res = await api.getResources(token)
    if (Array.isArray(res)) {
      setResources(res)
    } else {
      setResources([])
      setPanelMessage(res?.message || 'No se pudieron cargar los recursos')
    }
    setLoading(false)
  }, [activeTab, isAdmin, token])

  useEffect(() => {
    if (!visibleTabs.some((tab) => tab.key === activeTab)) {
      setActiveTab(visibleTabs[0]?.key || 'noticias')
    }
  }, [activeTab, visibleTabs])

  useEffect(() => {
    loadActiveTab()
  }, [loadActiveTab])

  const onDeleteUser = async (id) => {
    if (!confirm('¿Eliminar este usuario por mal comportamiento?')) return
    const res = await api.deleteUser(id, token)
    if (res?.status && res.status >= 400) {
      setPanelMessage(res.message || 'No se pudo eliminar el usuario')
      return
    }
    setPanelMessage(res?.message || 'Usuario eliminado correctamente')
    await loadActiveTab()
  }

  const onCreateNews = async (e) => {
    e.preventDefault()
    const payload = {
      title: newsForm.title.trim(),
      news: newsForm.news.trim(),
      image_url: newsForm.image_url.trim() || undefined,
    }
    const res = await api.createNews(payload, token)
    if (res?.id) {
      setNewsForm({ title: '', news: '', image_url: '' })
      setPanelMessage('Noticia creada correctamente')
      await loadActiveTab()
      return
    }
    setPanelMessage(res?.message || 'No se pudo crear la noticia')
  }

  const onDeleteNews = async (id) => {
    if (!confirm('¿Eliminar noticia?')) return
    const res = await api.deleteNews(id, token)
    if (res?.status && res.status >= 400) {
      setPanelMessage(res.message || 'No se pudo eliminar la noticia')
      return
    }
    setPanelMessage('Noticia eliminada correctamente')
    await loadActiveTab()
  }

  const onEditNews = async (id) => {
    const title = prompt('Nuevo titulo de la noticia')
    if (!title) return
    const res = await api.updateNews(id, { title: title.trim() }, token)
    if (res?.status && res.status >= 400) {
      setPanelMessage(res.message || 'No se pudo actualizar la noticia')
      return
    }
    setPanelMessage('Noticia actualizada')
    await loadActiveTab()
  }

  const onCreateVideo = async (e) => {
    e.preventDefault()
    const payload = {
      title: videoForm.title.trim(),
      video_url: videoForm.video_url.trim(),
      thumbnail: videoForm.thumbnail.trim() || undefined,
    }
    const res = await api.createVideo(payload, token)
    if (res?.id) {
      setVideoForm({ title: '', video_url: '', thumbnail: '' })
      setPanelMessage('Video creado correctamente')
      await loadActiveTab()
      return
    }
    setPanelMessage(res?.message || 'No se pudo crear el video')
  }

  const onDeleteVideo = async (id) => {
    if (!confirm('¿Eliminar video?')) return
    const res = await api.deleteVideo(id, token)
    if (res?.status && res.status >= 400) {
      setPanelMessage(res.message || 'No se pudo eliminar el video')
      return
    }
    setPanelMessage('Video eliminado correctamente')
    await loadActiveTab()
  }

  const onEditVideo = async (id) => {
    const title = prompt('Nuevo titulo del video')
    if (!title) return
    const res = await api.updateVideo(id, { title: title.trim() }, token)
    if (res?.status && res.status >= 400) {
      setPanelMessage(res.message || 'No se pudo actualizar el video')
      return
    }
    setPanelMessage('Video actualizado')
    await loadActiveTab()
  }

  const onCreateResource = async (e) => {
    e.preventDefault()
    const payload = {
      title: resourceForm.title.trim(),
      resource: resourceForm.resource.trim(),
      resource_url: resourceForm.resource_url.trim(),
      image_url: resourceForm.image_url.trim() || undefined,
    }
    const res = await api.createResource(payload, token)
    if (res?.id) {
      setResourceForm({ title: '', resource: '', resource_url: '', image_url: '' })
      setPanelMessage('Recurso creado correctamente')
      await loadActiveTab()
      return
    }
    setPanelMessage(res?.message || 'No se pudo crear el recurso')
  }

  const onDeleteResource = async (id) => {
    if (!confirm('¿Eliminar recurso?')) return
    const res = await api.deleteResource(id, token)
    if (res?.status && res.status >= 400) {
      setPanelMessage(res.message || 'No se pudo eliminar el recurso')
      return
    }
    setPanelMessage('Recurso eliminado correctamente')
    await loadActiveTab()
  }

  const onEditResource = async (id) => {
    const title = prompt('Nuevo titulo del recurso')
    if (!title) return
    const res = await api.updateResource(id, { title: title.trim() }, token)
    if (res?.status && res.status >= 400) {
      setPanelMessage(res.message || 'No se pudo actualizar el recurso')
      return
    }
    setPanelMessage('Recurso actualizado')
    await loadActiveTab()
  }

  const renderUsersTab = () => (
    <div className="profile-panel__body">
      {!users.length && !loading ? <p className="profile-empty">No hay usuarios activos.</p> : null}

      <div className="profile-users-list">
        {users.map((item) => (
          <article key={item.id} className="profile-user-row">
            <div>
              <strong>{item.name || 'Sin nombre'}</strong>
              <p>{item.email}</p>
            </div>

            <div className="profile-user-row__meta">
              <span className={`role-chip role-chip--${item.rol}`}>{item.rol}</span>
              <small>{item.status || 'active'}</small>
              <small>{item.created_at ? new Date(item.created_at).toLocaleDateString('es-ES') : ''}</small>
            </div>

            <div className="news-card__actions">
              {Number(item.id) !== Number(user.id) ? (
                <button className="btn btn--danger" onClick={() => onDeleteUser(item.id)}>Eliminar</button>
              ) : (
                <button className="btn btn--ghost" disabled>Tu cuenta</button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  const renderNewsTab = () => (
    <div className="profile-panel__body">
      {isAdmin ? (
        <form className="admin-form" onSubmit={onCreateNews}>
          <input
            name="title"
            placeholder="Titulo"
            value={newsForm.title}
            onChange={(e) => setNewsForm((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
          <textarea
            name="news"
            placeholder="Contenido de la noticia"
            value={newsForm.news}
            onChange={(e) => setNewsForm((prev) => ({ ...prev, news: e.target.value }))}
            rows={4}
            required
          />
          <input
            name="image_url"
            placeholder="URL de imagen (opcional)"
            value={newsForm.image_url}
            onChange={(e) => setNewsForm((prev) => ({ ...prev, image_url: e.target.value }))}
          />
          <button type="submit" className="btn btn--primary">Crear noticia</button>
        </form>
      ) : null}

      {!news.length && !loading ? <p className="profile-empty">No hay noticias disponibles.</p> : null}

      <div className="news-grid">
        {news.map((item) => (
          <article className="news-card" key={item.id}>
            {item.image_url ? <img className="news-card__image" src={item.image_url} alt={item.title} /> : null}
            <div className="news-card__body">
              <h3>{item.title}</h3>
              <p>{item.news}</p>
              <small>Autor: {item.user_id || 'admin'}</small>
            </div>

            {isAdmin ? (
              <div className="news-card__actions">
                <button className="btn btn--ghost" onClick={() => onEditNews(item.id)}>Editar</button>
                <button className="btn btn--danger" onClick={() => onDeleteNews(item.id)}>Eliminar</button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )

  const renderVideosTab = () => (
    <div className="profile-panel__body">
      {isAdmin ? (
        <form className="admin-form" onSubmit={onCreateVideo}>
          <input
            name="title"
            placeholder="Titulo"
            value={videoForm.title}
            onChange={(e) => setVideoForm((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
          <input
            name="video_url"
            placeholder="URL del video"
            value={videoForm.video_url}
            onChange={(e) => setVideoForm((prev) => ({ ...prev, video_url: e.target.value }))}
            required
          />
          <input
            name="thumbnail"
            placeholder="URL de thumbnail (opcional)"
            value={videoForm.thumbnail}
            onChange={(e) => setVideoForm((prev) => ({ ...prev, thumbnail: e.target.value }))}
          />
          <small className="admin-form__hint">Thumbnail: imagen de portada opcional del video.</small>
          <button type="submit" className="btn btn--primary">Subir video</button>
        </form>
      ) : null}

      {!videos.length && !loading ? <p className="profile-empty">No hay videos disponibles.</p> : null}

      <div className="video-grid">
        {videos.map((item) => (
          <article className="video-card" key={item.id}>
            <div className="video-frame-wrap">
              <iframe
                src={toEmbedUrl(item.video_url)}
                title={item.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="video-card__body">
              <h3>{item.title}</h3>
              <small>Autor: {item.user_id || 'admin'}</small>
            </div>
            {isAdmin ? (
              <div className="news-card__actions">
                <button className="btn btn--ghost" onClick={() => onEditVideo(item.id)}>Editar</button>
                <button className="btn btn--danger" onClick={() => onDeleteVideo(item.id)}>Eliminar</button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )

  const renderResourcesTab = () => (
    <div className="profile-panel__body">
      {isAdmin ? (
        <form className="admin-form" onSubmit={onCreateResource}>
          <input
            name="title"
            placeholder="Titulo"
            value={resourceForm.title}
            onChange={(e) => setResourceForm((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
          <input
            name="resource"
            placeholder="Descripcion corta"
            value={resourceForm.resource}
            onChange={(e) => setResourceForm((prev) => ({ ...prev, resource: e.target.value }))}
            required
          />
          <input
            name="resource_url"
            placeholder="URL del recurso"
            value={resourceForm.resource_url}
            onChange={(e) => setResourceForm((prev) => ({ ...prev, resource_url: e.target.value }))}
            required
          />
          <input
            name="image_url"
            placeholder="URL de imagen (opcional)"
            value={resourceForm.image_url}
            onChange={(e) => setResourceForm((prev) => ({ ...prev, image_url: e.target.value }))}
          />
          <button type="submit" className="btn btn--primary">Crear recurso</button>
        </form>
      ) : null}

      {!resources.length && !loading ? <p className="profile-empty">No hay recursos disponibles.</p> : null}

      <div className="resource-grid">
        {resources.map((item) => (
          <article className="resource-card" key={item.id}>
            {item.image_url ? <img src={item.image_url} alt={item.title} className="resource-card__image" /> : null}
            <div className="resource-card__body">
              <h3>{item.title}</h3>
              <p>{item.resource}</p>
              <a href={item.resource_url} target="_blank" rel="noreferrer" className="resource-card__link">Ver recurso</a>
            </div>
            {isAdmin ? (
              <div className="news-card__actions">
                <button className="btn btn--ghost" onClick={() => onEditResource(item.id)}>Editar</button>
                <button className="btn btn--danger" onClick={() => onDeleteResource(item.id)}>Eliminar</button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )

  const renderPanel = () => {
    if (activeTab === 'usuarios') return renderUsersTab()
    if (activeTab === 'noticias') return renderNewsTab()
    if (activeTab === 'videos') return renderVideosTab()
    return renderResourcesTab()
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="profile-page">
      <section className="profile-card profile-card--admin">
        <h1>Mi perfil</h1>
        <p className="profile-card__welcome">
          Buen dia,
          <span> {user.name || user.email}</span>
        </p>

        <div className="profile-menu">
          {visibleTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={activeTab === tab.key ? 'is-active' : ''}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="profile-meta-grid">
          <div className="profile-card__block">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>
          <div className="profile-card__block">
            <span>Rol</span>
            <strong>{user.rol}</strong>
          </div>
        </div>

        <div className="profile-panel">
          {loading ? <p className="profile-empty">Cargando panel...</p> : null}
          {panelMessage ? <p className="form-message">{panelMessage}</p> : null}
          {!loading ? renderPanel() : null}
        </div>

        <button className="btn btn--primary" onClick={logout}>Cerrar sesion</button>
      </section>
    </div>
  )
}

export default Perfil
