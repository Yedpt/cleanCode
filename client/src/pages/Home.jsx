import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import homeHero from '../assets/home.jpg'
import community from '../assets/sobreNosotros.png'
import fallbackNews from '../assets/lenguajes.jpg'
import * as api from '../services/CodeYedServices'

const spotlightClassByIndex = [
  'spotlight-card spotlight-card--primary',
  'spotlight-card spotlight-card--side-a',
  'spotlight-card spotlight-card--side-b',
  'spotlight-card spotlight-card--side-c',
]

const Home = () => {
  const [spotlightNews, setSpotlightNews] = useState([])
  const [loadingSpotlight, setLoadingSpotlight] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadSpotlight = async () => {
      setLoadingSpotlight(true)
      const res = await api.getNews()

      if (cancelled) return

      if (Array.isArray(res)) {
        const firstFour = [...res]
          .sort((a, b) => (Number(b.id) || 0) - (Number(a.id) || 0))
          .slice(0, 4)
        setSpotlightNews(firstFour)
      } else {
        setSpotlightNews([])
      }

      setLoadingSpotlight(false)
    }

    loadSpotlight()

    return () => {
      cancelled = true
    }
  }, [])

  const spotlightCards = useMemo(
    () => spotlightNews.map((item, index) => ({
      ...item,
      className: spotlightClassByIndex[index] || 'spotlight-card',
    })),
    [spotlightNews],
  )

  return (
    <div className="home-page" id="home">
      <section className="hero" style={{ backgroundImage: `url(${homeHero})` }}>
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="eyebrow">CleanCoders</p>
          <h1>
            Bienvenido a
            <span> CleanCoders</span>
          </h1>
        </div>
      </section>

      <section className="section" aria-labelledby="spotlight-title">
        <h2 id="spotlight-title">Actualidad code</h2>
        {loadingSpotlight ? <div className="news-state">Cargando actualidad...</div> : null}

        {!loadingSpotlight && !spotlightCards.length ? (
          <div className="news-state">Todavia no hay noticias para mostrar en portada.</div>
        ) : null}

        {!loadingSpotlight && spotlightCards.length ? (
          <div className="spotlight-grid">
            {spotlightCards.map((item) => (
              <article className={item.className} key={item.id}>
                <Link to={`/noticias/${item.id}`} className="spotlight-card__link">
                  <img src={item.image_url || fallbackNews} alt={item.title || 'Noticia'} />
                  <div>
                    <h3>{item.title}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="section" id="about">
        <article className="panel panel--about">
          <h2>Sobre nosotros</h2>
          <div className="about-block">
            <div className="about-copy-wrap">
              <p className="about-kicker">Comunidad real para desarrolladores</p>
              <p className="about-copy">
                CleanCoders es un blog de programacion para programadores, sin fines de lucro,
                pensado para compartir noticias, recursos utiles y tendencias reales del sector.
                Nuestro objetivo es que cualquier dev, desde quien empieza hasta quien ya trabaja
                en la industria, tenga un espacio claro para informarse, descubrir herramientas y
                dejar feedback sobre lo ultimo que esta moviendo la comunidad tech.
              </p>
            </div>
            <div className="about-image-wrap">
              <img src={community} alt="Comunidad de desarrolladores" className="about-image" />
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

export default Home
