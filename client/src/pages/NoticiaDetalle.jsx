import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as api from '../services/CodeYedServices'
import homeHero from '../assets/home.jpg'
import fallbackNews from '../assets/lenguajes.jpg'

const NoticiaDetalle = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await api.getNewsById(id)
      setItem(data?.id ? data : null)
      setLoading(false)
    }

    load()
  }, [id])

  return (
    <div className="page-wrap">
      <section className="hero hero--compact" style={{ backgroundImage: `url(${homeHero})` }}>
        <div className="hero__overlay" />
        <div className="hero__content hero__content--center">
          <h1>NOTICIA DETALLADA</h1>
        </div>
      </section>

      <section className="section detail-section">
        {loading ? (
          <div className="news-state">Cargando detalle...</div>
        ) : item ? (
          <article className="detail-card">
            <h2 className="detail-card__heading">Actualidad code</h2>
            <img
              className="detail-card__image"
              src={item.image_url || fallbackNews}
              alt={item.title || 'Noticia'}
            />
            <div className="detail-card__meta">
              <h3>{item.title}</h3>
              <small>{item.published_at ? String(item.published_at).slice(0, 10) : 'Sin fecha'}</small>
            </div>
            <p>{item.news}</p>
            <div className="detail-card__footer">
              <Link to="/noticias" className="btn btn--ghost">Volver a noticias</Link>
            </div>
          </article>
        ) : (
          <div className="news-state">No se encontro la noticia.</div>
        )}
      </section>
    </div>
  )
}

export default NoticiaDetalle
