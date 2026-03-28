import homeHero from '../assets/home.jpg'
import codeYed from '../assets/CodeYed1.png'
import angular from '../assets/angular.jpg'
import googleTranslate from '../assets/googleTranslate.jpg'
import codeYedBlue from '../assets/codeYedblue.jpg'
import community from '../assets/moureDev.jpg'

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
            <img src={codeYed} alt="Editor de codigo" />
            <div>
              <h3>Los lenguajes mas populares segun expertos</h3>
              <p>Un vistazo rapido a las tecnologias que siguen dominando el mercado.</p>
            </div>
          </article>

          <article className="spotlight-card">
            <img src={angular} alt="Angular" />
            <div>
              <h3>Mira lo nuevo de Angular 18</h3>
              <p>Nuevas mejoras para rendimiento, DX y despliegues modernos.</p>
            </div>
          </article>

          <article className="spotlight-card">
            <img src={googleTranslate} alt="Herramienta para traducir" />
            <div>
              <h3>Herramientas IA para devs</h3>
              <p>Recopilacion de herramientas para acelerar tu flujo diario.</p>
            </div>
          </article>

          <article className="spotlight-card">
            <img src={codeYedBlue} alt="Snippet de codigo" />
            <div>
              <h3>Estilos de codigo y buenas practicas</h3>
              <p>Consejos para escribir codigo mantenible y con mejor rendimiento.</p>
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
