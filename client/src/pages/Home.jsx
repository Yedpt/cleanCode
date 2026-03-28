import homeHero from '../assets/home.jpg'
import jsImage from '../assets/JS.jpg'
import angular from '../assets/angular.jpg'
import googleTranslate from '../assets/googleTranslate.jpg'
import lenguajesMasSalidas from '../assets/lenguajesMasSalidas.jpg'
import community from '../assets/sobreNosotros.png'

const Home = () => {
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
        <div className="spotlight-grid">
          <article className="spotlight-card spotlight-card--primary">
            <img src={jsImage} alt="Editor de codigo" />
            <div>
              <h3>Los lenguajes mas populares segun expertos</h3>
            </div>
          </article>

          <article className="spotlight-card">
            <img src={angular} alt="Angular" />
            <div>
              <h3>Mira lo nuevo de Angular 18!</h3>
            </div>
          </article>

          <article className="spotlight-card">
            <img src={googleTranslate} alt="Herramienta para traducir" />
            <div>
              <h3>Tu sitio web en mas de 120 idiomas con el traductor de Google</h3>
            </div>
          </article>

          <article className="spotlight-card">
            <img src={lenguajesMasSalidas} alt="Lenguajes con mas salidas" />
            <div>
              <h3>Estos seran los lenguajes de programacion con mas salida en 2024</h3>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="about">
        <article className="panel panel--about">
          <h2>Sobre nosotros</h2>
          <div className="about-block">
            <p>
              Somos un grupo de apasionados por los videojuegos y el desarrollo, dedicados a
              compartir noticias, comparativas y lanzamientos que marcan tendencia.
              <br />
              <br />
              Participamos en toda la comunidad con actualizaciones, analisis detallados y una
              mirada critica para quienes quieren mantenerse al dia.
            </p>
            <img src={community} alt="Comunidad de desarrolladores" className="about-image" />
          </div>
        </article>
      </section>
    </div>
  )
}

export default Home
