import NewsList from '../components/NewsList'
import homeHero from '../assets/home.jpg'

const Noticias = () => {
  return (
    <div className="page-wrap">
      <section className="hero hero--compact" style={{ backgroundImage: `url(${homeHero})` }}>
        <div className="hero__overlay" />
        <div className="hero__content hero__content--center">
          <h1>NOTICIAS</h1>
        </div>
      </section>

      <section className="section" id="noticias" aria-labelledby="news-title">
        <h2 id="news-title">Ultimas noticias</h2>
        <NewsList variant="list" />
      </section>
    </div>
  )
}

export default Noticias
