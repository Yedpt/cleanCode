import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">CleanCoders</div>
      <div className="site-footer__links">
        <Link to="/">Inicio</Link>
        <Link to="/noticias">Noticias</Link>
        <a href="/#about">Sobre nosotros</a>
      </div>
      <p className="site-footer__copy">Todos los derechos reservados. CleanCode {year}</p>
    </footer>
  )
}

export default Footer
